import React, { useState, Dispatch, SetStateAction, useRef } from 'react';
import { SurveySingleItem } from 'survey-engine/lib/data_types';
import { SurveyEngineCore } from 'survey-engine/lib/engine';
import SurveySingleItemView from '../../SurveySingleItemView/SurveySingleItemView';

import { checkSurveyItemsValidity, checkSurveyItemValidity } from 'survey-engine/lib/validation-checkers';
import clsx from 'clsx';
import { getItemComponentByRole, getLocaleStringTextByCode } from '../../SurveySingleItemView/utils';

interface SurveyPageLocalisedTexts {
  backBtn: string;
  nextBtn: string;
  submitBtn: string;
  invalidResponse: string;
}

interface SurveyPageViewProps {
  loading?: boolean;
  surveyEngine: SurveyEngineCore;
  surveyItems: SurveySingleItem[];
  selectedLanguage: string;
  responseCount: number;
  setResponseCount: Dispatch<SetStateAction<number>>;
  onNextPage: () => void;
  onPreviousPage: () => void;
  showBackButton: boolean;
  onSubmit: () => void;
  isLastPage: boolean;
  localisedTexts: SurveyPageLocalisedTexts;
  surveyEndItem?: SurveySingleItem;
}

const SurveyPageView: React.FC<SurveyPageViewProps> = (props) => {
  const [displayedKeys, setDisplayedKeys] = useState<Array<string>>([]);
  const [showValidationErrors, setShowValidationErrors] = useState(false);

  const responses = props.surveyEngine.getResponses();

  const currentDisplayedKeys = props.surveyItems.map(item => item.key);
  if (displayedKeys.length > 0 && !displayedKeys.every(key => currentDisplayedKeys.includes(key))) {
    setDisplayedKeys(prev => {
      return prev.filter(key => currentDisplayedKeys.includes(key));
    })
  }

  const elRefs = useRef<HTMLDivElement>(null);
  const firstInvalidIndex = props.surveyItems.findIndex(it => !checkSurveyItemValidity(it).hard);

  const mapSurveyItemToComp = (surveyItem: SurveySingleItem, index: number): React.ReactFragment => {
    if (surveyItem.type === 'surveyEnd') {
      return <React.Fragment></React.Fragment>;
    }
    if (!displayedKeys.includes(surveyItem.key)) {
      props.surveyEngine.questionDisplayed(surveyItem.key);
      setDisplayedKeys(prev => {
        return [...prev, surveyItem.key];
      })
    }

    const itemResponse = responses.find((value) => value.key === surveyItem.key);
    const response = (itemResponse) ? itemResponse.response : undefined;

    const valid = checkSurveyItemValidity(surveyItem);

    return <div
      ref={index === firstInvalidIndex ? elRefs : null}
    >
      <SurveySingleItemView
        renderItem={surveyItem}
        languageCode={props.selectedLanguage}
        responseChanged={(response) => {
          if (response) {
            props.surveyEngine.setResponse(surveyItem.key, response);
            // Rerender page by updating state
            props.setResponseCount(props.responseCount + 1);
          }
        }}
        responsePrefill={response}
        showInvalid={!valid.hard && showValidationErrors}
        invalidWarning={props.localisedTexts.invalidResponse}
      />
    </div>
  }

  const valid = checkSurveyItemsValidity(props.surveyItems);

  const surveyEnd = () => {
    const titleComp = getItemComponentByRole(props.surveyEndItem?.components?.items, 'title');
    return <div>
      {titleComp ? getLocaleStringTextByCode(titleComp.content, props.selectedLanguage) : null}
      {props.showBackButton ?
        <button
          onClick={props.onPreviousPage}
        >
          {props.localisedTexts.backBtn}
        </button>
        : null}
      <button
        onClick={props.onSubmit}
      >
        {props.localisedTexts.submitBtn}
      </button>
    </div>
  };

  const surveyNavigation = () => (
    <div
      className="text-center my-3"
    >
      { props.showBackButton ?
        <button
          className="btn btn-outline-primary fs-btn"
          onClick={props.onPreviousPage}
        >
          {props.localisedTexts.backBtn}
        </button>
        : null}
      <button
        className="btn btn-primary ms-2 fw-bold fs-btn"
        onClick={props.onNextPage}
      >
        {props.localisedTexts.nextBtn}
      </button>
    </div>
  );
  /*
  const actionButton = (
    <Box textAlign="center" m={1}>
      {!showValidationErrors ? null : <p>{props.valididityWarningLabel}</p>}

      <Button
        onClick={() => {
          if (!valid.hard) {
            setShowValidationErrors(true);
            console.log(elRefs)
            // Scroll to first invalid item
            if (elRefs.current) {
              elRefs.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
              });
            }
            return;
          }
          setShowValidationErrors(false);
          props.action();
        }}
        disabled={props.loading}
      //disabled={showValidationErrors && !valid.hard}
      >
        {props.actionLabel}
      </Button>
    </Box >
  )*/

  // <-- already merged
  // --> from study manager app

  /*
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
  )*/

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
            {mapSurveyItemToComp(surveyItem, index)}
          </div>
        )
      }
      { props.isLastPage ? surveyEnd() : surveyNavigation()}
    </div>
  );
};

export default SurveyPageView;
