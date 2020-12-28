import React, { useState, Dispatch, SetStateAction } from 'react';
import { SurveySingleItem } from 'survey-engine/lib/data_types';
import { SurveyEngineCore } from 'survey-engine/lib/engine';
import SurveySingleItemView from '../../SurveySingleItemView/SurveySingleItemView';

import RoundedButton from '../../../ui/buttons/RoundedButton';
import { checkSurveyItemsValidity } from 'survey-engine/lib/validation-checkers';
import clsx from 'clsx';

interface SurveyPageViewProps {
  surveyEngine: SurveyEngineCore;
  surveyItems: SurveySingleItem[];
  actionLabel: string;
  action: () => void;
  selectedLanguage: string;
  responseCount: number;
  setResponseCount: Dispatch<SetStateAction<number>>
}

const SurveyPageView: React.FC<SurveyPageViewProps> = (props) => {
  const [displayedKeys, setDisplayedKeys] = useState<Array<string>>([]);

  const responses = props.surveyEngine.getResponses();

  const currentDisplayedKeys = props.surveyItems.map(item => item.key);
  if (displayedKeys.length > 0 && !displayedKeys.every(key => currentDisplayedKeys.includes(key))) {
    setDisplayedKeys(prev => {
      return prev.filter(key => currentDisplayedKeys.includes(key));
    })
  }

  const mapSurveyItemToComp = (surveyItem: SurveySingleItem): React.ReactFragment => {
    if (!displayedKeys.includes(surveyItem.key)) {
      props.surveyEngine.questionDisplayed(surveyItem.key);
      setDisplayedKeys(prev => {
        return [...prev, surveyItem.key];
      })
    }

    let itemResponse = responses.find((value) => value.key === surveyItem.key);
    let response = (itemResponse) ? itemResponse.response : undefined;

    return <SurveySingleItemView
      renderItem={surveyItem}
      invalidWarning={'TODO: invalid'}
      languageCode={props.selectedLanguage}
      responseChanged={(response) => {
        if (response) {
          props.surveyEngine.setResponse(surveyItem.key, response);
          // Rerender page by updating state
          props.setResponseCount(props.responseCount + 1);
        }
      }}
      responsePrefill={response}
    />
  }

  const actionButton = (
    <div className="text-center">
      {checkSurveyItemsValidity(props.surveyItems).hard ? 'valid' : 'invalid'}
      <RoundedButton
        className="m-3"
        color="primary"
        onClick={props.action}
      >
        {props.actionLabel}
      </RoundedButton>
    </div>
  )

  return (
    <div >
      {
        props.surveyItems.map((surveyItem, index) =>
          <div
            className={clsx(
              'p-0',
              {
                'mt-2a': index > 0
              }
            )}
            key={surveyItem.key}>
            {mapSurveyItemToComp(surveyItem)}
          </div>
        )
      }
      {actionButton}
    </div>
  );
};

export default SurveyPageView;
