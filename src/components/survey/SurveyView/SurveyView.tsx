import React, { useState, Fragment, useEffect } from 'react';
import { Survey, SurveySingleItemResponse, SurveyContext } from 'survey-engine/lib/data_types';
import { SurveyEngineCore } from 'survey-engine/lib/engine';
import SurveyPageView from './SurveyPageView/SurveyPageView';
import SurveyProgress from './SurveyProgress/SurveyProgress';

interface SurveyViewProps {
  loading?: boolean;
  survey: Survey;
  languageCode: string;
  onSubmit: (responses: SurveySingleItemResponse[]) => void;
  prefills?: SurveySingleItemResponse[];
  context?: SurveyContext;
  backBtnText: string;
  nextBtnText: string;
  submitBtnText: string;
  invalidResponseText: string;
  hideBackButton?: boolean;
  // init with temporary loaded results
  // save temporary result
}

const SurveyView: React.FC<SurveyViewProps> = (props) => {
  const [surveyEngine, setSurveyEngine] = useState<SurveyEngineCore>(new SurveyEngineCore(props.survey, props.context, props.prefills));
  const surveyPages = surveyEngine.getSurveyPages();

  const [responseCount, setResponseCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    setSurveyEngine(new SurveyEngineCore(props.survey, props.context, props.prefills));
  }, [props.survey, props.context, props.prefills]);

  const onSubmit = () => {
    const resp = surveyEngine.getResponses();
    props.onSubmit(resp);
  }

  const resetScrollPosition = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;

  }

  console.log(surveyEngine.getSurveyEndItem());

  const renderCurrentPage = () => {
    if (currentPage < 0 || currentPage > surveyPages.length - 1) {
      setCurrentPage(0);
      return;
    }

    const isLastPage = currentPage >= surveyPages.length - 1;

    return <SurveyPageView
      loading={props.loading}
      surveyEngine={surveyEngine}
      surveyItems={surveyPages[currentPage]}
      localisedTexts={{
        backBtn: props.backBtnText,
        nextBtn: props.nextBtnText,
        submitBtn: props.submitBtnText,
        invalidResponse: props.invalidResponseText ? props.invalidResponseText : '',
      }}
      showBackButton={currentPage > 0 && !props.hideBackButton}
      onPreviousPage={() => {
        setCurrentPage(prev => Math.max(0, prev - 1));
        // resetScrollPosition();
      }}
      onNextPage={() => {
        setCurrentPage(prev => prev + 1);
        resetScrollPosition();
      }}
      surveyEndItem={surveyEngine.getSurveyEndItem()}
      onSubmit={onSubmit}
      isLastPage={isLastPage}
      selectedLanguage={props.languageCode}
      responseCount={responseCount}
      setResponseCount={setResponseCount}
    />;
  }

  return (
    <Fragment>
      {surveyPages.length > 1 ?
        <div className="py-3 px-2 px-sm-3">
          <SurveyProgress
            currentIndex={currentPage}
            totalCount={surveyPages.length}
          />
        </div> : null}
      {renderCurrentPage()}
    </Fragment>
  );
};

export default SurveyView;
