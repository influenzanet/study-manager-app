import React from 'react';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import { ItemGroupComponent } from 'survey-engine/lib/data_types';

import TextViewComponent from './TextViewComponent';

interface HelpGroupProps {
  componentGroup: ItemGroupComponent;
  languageCode: string;
}

const HelpGroup: React.FC<HelpGroupProps> = (props) => {
  return (
    <div className="d-flex align-items-center">
      <button
        type="button"
        className="btn-icon-primary"
        aria-label={"Open Infos"}
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <InfoOutlinedIcon />
      </button>
      <div
        id={'info-dropdown'}
        aria-label={'Info Box'}
        className="dropdown-menu dropdown-menu-end p-2 w-75"
        style={{ maxWidth: 500 }}
      >
        {
          props.componentGroup.items.map((item, index) => {
            return <TextViewComponent key={index.toFixed()}
              compDef={item}
              languageCode={props.languageCode}
            />
          })
        }
      </div>
    </div>
  );
};

export default HelpGroup;
