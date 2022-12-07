import React from 'react';
import { Survey } from 'survey-engine/data_types';

interface ItemOverviewProps {
    survey: Survey;
    languageCode: string;
}

const ItemOverview: React.FC<ItemOverviewProps> = (props) => {

    console.log(props.survey);
    return (
        <p>ItemOverview</p>
    );
};

export default ItemOverview;
