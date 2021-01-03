import React, { useState, useEffect } from 'react';
import { ItemComponent, ResponseItem, ItemGroupComponent } from 'survey-engine/lib/data_types';
import { getLocaleStringTextByCode, getItemComponentByRole } from '../../utils';
import clsx from 'clsx';
import NumberInput from './NumberInput';
import DropDownGroup from './DropDownGroup';
import TextInput from './TextInput';

interface MatrixProps {
  compDef: ItemComponent;
  prefill?: ResponseItem;
  responseChanged: (response: ResponseItem | undefined) => void;
  languageCode: string;
  componentKey: string;
}


const Matrix: React.FC<MatrixProps> = (props) => {
  const [response, setResponse] = useState<ResponseItem | undefined>(props.prefill);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (touched) {
      const timer = setTimeout(() => {
        props.responseChanged(response);
      }, 200);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const radioSelectionChanged = (rowKey: string | undefined) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!rowKey) { return; }
    const selectedValue = event.target.value;

    setTouched(true);
    setResponse(prev => {
      if (!prev || !prev.items) {
        return {
          key: props.compDef.key ? props.compDef.key : 'no key found',
          items: [{
            key: rowKey, items: [{ key: selectedValue }]
          }]
        }
      }

      const rowIndex = prev.items.findIndex(item => item.key === rowKey);
      const items = [...prev.items];
      if (rowIndex > -1) {
        items[rowIndex].items = [{ key: selectedValue }];
      } else {
        items.push({
          key: rowKey, items: [{ key: selectedValue }]
        });
      }

      return {
        ...prev,
        items: items
      }
    });
  }

  const checkboxSelectionChanged = (rowKey: string | undefined) => (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!rowKey) { return; }
    setTouched(true);
    const selectedValue = event.target.value;
    const checked = event.target.checked;
    if (checked) {
      const newRI: ResponseItem = {
        key: selectedValue,
      }
      setResponse(prev => {
        if (!prev || !prev.items) {
          return {
            key: props.compDef.key ? props.compDef.key : 'no key found',
            items: [{
              key: rowKey, items: [newRI]
            }]
          }
        }
        const rowIndex = prev.items.findIndex(item => item.key === rowKey);
        const items = [...prev.items];
        if (rowIndex > -1) {
          const currentItems = items[rowIndex];
          items[rowIndex].items = currentItems.items ? [...currentItems.items, newRI] : [newRI];
        } else {
          items.push({
            key: rowKey, items: [newRI]
          });
        }
        return {
          ...prev,
          items: items
        }

      });
    } else {
      setResponse(prev => {
        if (!prev || !prev.items) {
          return {
            key: props.compDef.key ? props.compDef.key : 'no key found',
            items: []
          }
        }
        const rowIndex = prev.items.findIndex(item => item.key === rowKey);
        const items = [...prev.items];
        if (rowIndex > -1) {
          const currentItems = items[rowIndex];
          items[rowIndex].items = currentItems.items?.filter(i => i.key !== selectedValue);
        }
        return {
          ...prev,
          items: items,
        }

      });
    }

  }

  const handleCellResponseChange = (rowKey: string | undefined, itemKey: string | undefined) => (response: ResponseItem | undefined) => {
    if (!rowKey || !itemKey) { return; }
    setTouched(true);

    setResponse(prev => {
      if (!prev || !prev.items) {
        return {
          key: props.compDef.key ? props.compDef.key : 'no key found',
          items: [{
            key: rowKey, items: response ? [response] : []
          }]
        }
      }

      const rowIndex = prev.items.findIndex(item => item.key === rowKey);
      const items = [...prev.items];
      if (rowIndex > -1) {
        const currentItems = items[rowIndex].items;
        if (!currentItems) {
          console.warn('row doesnt have items');
          return prev;
        }
        const itemIndex = currentItems.findIndex(it => it.key === itemKey);
        if (itemIndex > -1) {
          if (!response) {
            currentItems.splice(itemIndex, 1);
          } else {
            currentItems[itemIndex] = response;
          }
        } else if (response) {
          currentItems.push(response);
        }
        items[rowIndex].items = [...currentItems];
      } else {
        items.push({
          key: rowKey, items: response ? [response] : []
        });
      }

      return {
        ...prev,
        items: items
      }
    });
  }

  const getCellResponse = (rowKey: string | undefined, itemKey: string | undefined): ResponseItem | undefined => {
    if (!rowKey || !itemKey) { return undefined; }

    if (!response || !response.items || response.items.length < 1) {
      return undefined;
    }
    const rowResponse = response.items.find(item => item.key === rowKey);
    if (!rowResponse || !rowResponse.items || rowResponse.items.length < 1) { return undefined; }
    const resp = rowResponse.items.find(item => item.key === itemKey);
    return resp;
  }

  const isResponseSet = (rowKey: string | undefined, itemKey: string | undefined): boolean => {
    if (!getCellResponse(rowKey, itemKey)) {
      return false;
    }
    return true;
  }

  const renderRadioRow = (compDef: ItemGroupComponent, index: number): React.ReactNode => {
    const rowKey = [props.componentKey, compDef.key].join('.');

    const cells = (compDef as ItemGroupComponent).items.map((cell, cindex) => {
      let currentCellContent: React.ReactNode | null;
      const cellKey = [rowKey, cell.key].join('.');
      switch (cell.role) {
        case 'label':
          currentCellContent = getLocaleStringTextByCode(cell.content, props.languageCode);
          break;
        case 'option':
          currentCellContent = <input
            className="form-check-input cursor-pointer"
            type="radio"
            id={cellKey}
            value={cell.key}
            aria-label={cell.key}
            checked={isResponseSet(compDef.key, cell.key)}
            onChange={radioSelectionChanged(compDef.key)}
            disabled={compDef.disabled !== undefined || cell.disabled !== undefined}
          />
          /*  <Radio
              checked={isResponseSet(compDef.key, cell.key)}
              onChange={radioSelectionChanged(compDef.key)}
              value={cell.key}
              disabled={compDef.disabled !== undefined || cell.disabled !== undefined}
              inputProps={{ 'aria-label': cell.key }}
            />;*/
          break;
        default:
          console.warn('cell role for matrix question unknown: ', cell.role);
          break;
      }
      return <td
        key={cell.key ? cell.key : cindex.toString()}
        className={clsx(
          "border-bottom border-grey-2",
          "px-2 py-1",
          {
            'text-center': cell.role === 'option',
          })}
        style={{
          minWidth: 33,
        }}
      >{currentCellContent}</td>
    }

    );
    return <tr key={compDef.key}
    >
      {cells}
    </tr>
  }

  const renderResponseRow = (compDef: ItemGroupComponent, index: number): React.ReactNode => {
    const rowKey = [props.componentKey, compDef.key].join('.');
    const cells = (compDef as ItemGroupComponent).items.map((cell, cIndex) => {
      const cellKey = [rowKey, cell.key].join('.');
      let currentCellContent: React.ReactNode | null;
      const isLast = index === matrixDef.items.length - 1;
      switch (cell.role) {
        case 'label':
          currentCellContent = getLocaleStringTextByCode(cell.content, props.languageCode);
          break;
        case 'check':
          currentCellContent = <input
            className="form-check-input cursor-pointer"
            type="checkbox"
            id={cellKey}
            value={cell.key}
            aria-label={cell.key}
            checked={isResponseSet(compDef.key, cell.key)}
            onChange={checkboxSelectionChanged(compDef.key)}
            disabled={compDef.disabled !== undefined || cell.disabled !== undefined}
          />
          /*
          <Checkbox
            checked={isResponseSet(compDef.key, cell.key)}
            value={cell.key}
            onChange={checkboxSelectionChanged(compDef.key)}
            inputProps={{ 'aria-label': cell.key }}
            disabled={compDef.disabled !== undefined || cell.disabled !== undefined}
          />;*/
          break
        case 'input':
          currentCellContent = <div
            className="w-100"
            style={{
              minWidth: 120,
            }}
          >
            <TextInput
              parentKey={cellKey}
              compDef={cell}
              languageCode={props.languageCode}
              responseChanged={handleCellResponseChange(compDef.key, cell.key)}
              prefill={getCellResponse(compDef.key, cell.key)}
            />
          </div>
          break
        case 'numberInput':
          currentCellContent =
            <NumberInput
              componentKey={cellKey}
              compDef={cell}
              languageCode={props.languageCode}
              responseChanged={handleCellResponseChange(compDef.key, cell.key)}
              prefill={getCellResponse(compDef.key, cell.key)}
            />
          break
        case 'dropDownGroup':
          currentCellContent = <DropDownGroup
            compDef={cell}
            languageCode={props.languageCode}
            responseChanged={handleCellResponseChange(compDef.key, cell.key)}
            prefill={getCellResponse(compDef.key, cell.key)}
            fullWidth={true}
            componentKey={cellKey}
          />
          break;
        default:
          console.warn('cell role for matrix question unknown: ', cell.role);
          break;
      }
      return <td
        key={cell.key ? cell.key : cIndex.toString()}
        className={clsx(
          "px-2 py-1",
          {
            "border-bottom border-grey-2": !isLast

          })}
      >{currentCellContent}</td>
    }

    );
    return <tr key={compDef.key}
    >
      {cells}
    </tr>
  }

  const renderTableRow = (compDef: ItemGroupComponent, index: number): React.ReactNode => {
    if (compDef.displayCondition === false) {
      return null;
    }
    switch (compDef.role) {
      case 'radioRow':
        return renderRadioRow(compDef, index);
      case 'responseRow':
        return renderResponseRow(compDef, index);
      case 'headerRow':
        // header is already rendered separately
        return null;
      default:
        console.warn('row role for matrix question unknown: ', compDef.role);
        return null;
    }
  }

  const renderHeaderRow = (header: ItemGroupComponent | undefined): React.ReactNode => {
    if (!header) {
      return null;
    }
    const cells = header.items.map((cell, index) => {
      let currentCellContent: React.ReactNode | null;
      switch (cell.role) {
        case 'text':
          currentCellContent = getLocaleStringTextByCode(cell.content, props.languageCode);
          break;
        default:
          console.warn('cell role for matrix header unknown: ', cell.role);
          break;
      }
      return <th
        key={cell.key ? cell.key : index.toString()}
        className={"px-2 py-1"}
      >
        {currentCellContent}
      </th>
    })
    return <tr
      key={header.key ? header.key : "header"}
      className="border-bottom border-grey-2"
    >
      {cells}
    </tr>
  }

  const matrixDef = (props.compDef as ItemGroupComponent);
  const headerRow = getItemComponentByRole(matrixDef.items, 'headerRow');

  return (
    <div className="d-flex justify-content-center text-center"
      style={{
        overflowX: 'auto',
      }}
    >
      <table className="w-100 my-0 mx-auto"
        style={{
          borderCollapse: 'collapse',
          overflow: 'hidden',
        }}
      >
        <thead>
          {renderHeaderRow(headerRow as ItemGroupComponent)}
        </thead>
        <tbody>
          {matrixDef.items.map((row, index) => renderTableRow(row as ItemGroupComponent, index))}
        </tbody>
      </table>
    </div>
  );
};

export default Matrix;
