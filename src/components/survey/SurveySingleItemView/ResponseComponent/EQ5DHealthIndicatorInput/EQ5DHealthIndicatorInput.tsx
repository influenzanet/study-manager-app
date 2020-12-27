import React, { useRef, useState } from 'react';
import { isItemGroupComponent, ItemComponent, ResponseItem } from 'survey-engine/lib/data_types';
import { getItemComponentByRole, getLocaleStringTextByCode } from '../../utils';
import clsx from 'clsx';

interface EQ5DHealthIndicatorInputProps {
    compDef: ItemComponent;
    prefill?: ResponseItem;
    responseChanged: (response: ResponseItem | undefined) => void;
    languageCode: string;
    isRequired: boolean;
}

const EQ5DHealthIndicatorInput: React.FC<EQ5DHealthIndicatorInputProps> = (props) => {

    const [value, setValue] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const sliderRef = useRef<HTMLDivElement>(null);

    if (!isItemGroupComponent(props.compDef)) {
        return null;
    };
    // TODO: expect four text parts

    const instructionComp = getItemComponentByRole(props.compDef.items, 'instruction');
    const minValueComp = getItemComponentByRole(props.compDef.items, 'mintext');
    const maxValueComp = getItemComponentByRole(props.compDef.items, 'maxtext');
    const valueBoxComp = getItemComponentByRole(props.compDef.items, 'valuebox');
    // TODO: extract localized question text
    // TODO: extract localized box text
    // TODO: extract localized min text
    // TODO: extract localized max text

    const renderInstruction = () => {
        if (!instructionComp) {
            return null;
        }
        return (<h6>
            { getLocaleStringTextByCode(instructionComp.content, props.languageCode)}
            {props.isRequired ?
                <span className="ms-1 text-primary">
                    {'*'}
                </span> : null}
        </h6>
        );
    }

    const renderValueBox = () => {
        return <div className="col-12 col-md-6 bg-primary text-white p-2">
            {valueBoxComp ? getLocaleStringTextByCode(valueBoxComp.content, props.languageCode) : null}
            <span className="ms-1">{value}</span>
        </div>
    }

    const getTickItem = (index: number) => {
        const value = (100 - index);
        /*if (value % 10 === 0) {
            return <div
                key={index.toFixed()}
                className="border-top d-flex">
                <div className="bg-grey-1" style={{ width: 32, height: 2 }}></span>
                {value.toFixed()}
            </div>
        }*/
        const isDecimal = value % 10 === 0;
        return <div
            key={index.toFixed()}
            className="d-flex justify-content-center align-items-center position-relative"
            style={{ height: 5 }}
        >
            <div
                className={
                    clsx(
                        {
                            'bg-grey-7': isDecimal,
                            'bg-grey-5': !isDecimal
                        })
                } style={{ width: isDecimal ? 32 : 16, height: 2 }}>

            </div>
            {isDecimal ? <div className="position-absolute"
                style={{
                    left: '70%'
                }}
            >
                {value.toFixed()}
            </div> : null}

        </div>
    }

    const mouseHandler = (event: React.MouseEvent) => {
        const top = sliderRef.current?.getBoundingClientRect().top;
        const height = sliderRef.current?.getBoundingClientRect().height;
        if (!top || !height) { return; }
        const value = Math.min(Math.max(1 - (event.clientY - top - 17) / (height - 35), 0), 1);
        console.log(value);

        setValue(Math.round(value * 100));
        //var x = event.clientX - bounds.left;
        // var y = event.clientY - bounds.top;
    }

    return (
        <div className="row">
            <div className="col-6 d-flex flex-column position-relative">
                <div className="position-absolute">
                    {renderInstruction()}
                </div>

                <div className="flex-grow-1 d-flex align-items-center justify-content-end">
                    {renderValueBox()}
                </div>
            </div>
            <div className="col-6">
                <div className="text-center" style={{ maxWidth: 180 }}>
                    <p className="m-0 fw-bold">{minValueComp ? getLocaleStringTextByCode(minValueComp.content, props.languageCode) : null}</p>
                    <div className="py-2 position-relative"
                        style={{
                            cursor: 'pointer',
                            userSelect: 'none',
                        }}
                        ref={sliderRef}
                        onClick={mouseHandler}
                        onMouseMove={(event) => {
                            if (isDragging) {
                                mouseHandler(event);
                            }
                        }}
                        onMouseDown={() => setIsDragging(true)}
                        onMouseUp={() => setIsDragging(false)}
                        onMouseLeave={() => setIsDragging(false)}
                    >
                        {Array(101).fill(0).map((v: any, index: number) =>
                            getTickItem(index)
                        )}
                        <div className="text-center d-flex justify-content-center w-100 position-absolute"
                            style={{
                                top: `calc(${100 - value}*5px + 18px - 12px)`
                            }}
                        >
                            <div className="bg-primary rounded-circle"
                                style={{
                                    height: 24,
                                    width: 24,

                                }}
                            ></div>
                        </div>
                    </div>
                    <p className="m-0 fw-bold">{maxValueComp ? getLocaleStringTextByCode(maxValueComp.content, props.languageCode) : null}</p >
                </div>
            </div>
        </div>
    );
};

export default EQ5DHealthIndicatorInput;
