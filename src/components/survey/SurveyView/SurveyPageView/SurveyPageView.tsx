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
  ignoreValidation?: boolean;
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

  const handleClickWithValidation = (handler: () => void) => {
    if (props.ignoreValidation) {
      handler();
      return;
    }
    if (!valid.hard) {
      setShowValidationErrors(true);
      // console.log(elRefs)

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
    handler();
  };

  const surveyEnd = () => {
    const titleComp = getItemComponentByRole(props.surveyEndItem?.components?.items, 'title');
    return <div
      className="bg-grey-1 px-2 px-sm-3 py-2 mt-2a"
    >
      {titleComp ? <h5 className="text-primary fw-bold">{getLocaleStringTextByCode(titleComp.content, props.selectedLanguage)}</h5> : null}
      {props.showBackButton ?
        <button
          className="btn btn-outline-primary fs-btn"
          onClick={props.onPreviousPage}
          disabled={props.loading}
        >
          {props.localisedTexts.backBtn}
        </button>
        : null}
      <button
        className={clsx(
          "btn btn-primary fw-bold fs-btn",
          {
            "ms-2": props.showBackButton
          }
        )}
        onClick={() => handleClickWithValidation(props.onSubmit)}
        disabled={props.loading}
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
          disabled={props.loading}
        >
          {props.localisedTexts.backBtn}
        </button>
        : null}
      <button
        className="btn btn-primary ms-2 fw-bold fs-btn"
        onClick={() => handleClickWithValidation(props.onNextPage)}
        disabled={props.loading}
      >
        {props.localisedTexts.nextBtn}
      </button>
    </div>
  );

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
