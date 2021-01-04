import React, { useEffect, useState } from 'react';

import SurveyView from '../../components/survey/SurveyView/SurveyView';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';
import { Box, Button, TextField } from '@material-ui/core';
import { LocalizedString, LocalizedObject, Survey } from 'survey-engine/lib/data_types';

import availableSurveys from '../../editor-example-generators/surveys';
import { useHistory, useParams } from 'react-router-dom';

const availableLanguages = [
    { code: 'en', label: '🇬🇧 English' },
    { code: 'nl', label: '🇳🇱 Nederlands' },
    { code: 'de', label: '🇩🇪 Deutsch' },
    { code: 'fr', label: '🇫🇷 Français' },
];

const getSurveyURL = (instance: string, surveyKey?: string): string => {
    return `/preview/${instance}/${surveyKey}`;
}

const TestViewer: React.FC = () => {
    const [studyName, setStudyName] = useState('covid-19');
    let { instance, surveyKey } = useParams<{ instance: string; surveyKey: string; }>();
    const history = useHistory();

    const [selectedSurvey, setSelectedSurvey] = useState<Survey | undefined>();

    const instances = availableSurveys.map(obj => obj.instance);
    const selectedInstanceObj = availableSurveys.find(obj => obj.instance === instance);

    useEffect(() => {
        const selected = selectedInstanceObj?.surveys.find(obj => obj.name === surveyKey);
        if (!selected) {
            return;
        }
        setSelectedSurvey(selected.survey);
    }, [instance, surveyKey]);



    console.log(selectedSurvey);

    // Language settings
    const [selectedLanguage, setSelectedLanguage] = useState('en');

    const getSurveyNameByLocaleCode = (translations: LocalizedObject[] | undefined, code: string): string | undefined => {
        if (!translations) { return; }
        const translation = (translations.find(cont => cont.code === code) as LocalizedString);
        if (!translation) { return }
        return translation.parts.map(p => p.str).join('');
    }

    const survey = selectedSurvey;

    const renderSurveyNameAndDescription = (survey: Survey) => (
        <div className="py-2a px-2 px-sm-3 bg-grey-1">
            <div className="mb-2">
                <h5 className="d-inline fw-bold">
                    {getSurveyNameByLocaleCode(survey.props?.name, selectedLanguage)}
                </h5>
                <span className="ms-2 text-primary">
                    {getSurveyNameByLocaleCode(survey.props?.typicalDuration, selectedLanguage)}
                </span>
            </div>
            <p className="mb-0 fst-italic">
                {getSurveyNameByLocaleCode(survey.props?.description, selectedLanguage)}
            </p>

        </div>
    );



    const surveySelector = (
        <div className="py-2a px-2 px-sm-3 bg-grey-1 mb-2">
            <div className="row">
                <div className="col-12 col-sm-4 mb-2 mb-sm-0">
                    {/* instance selector */}
                    <div className="btn-group">
                        <button type="button" className="btn btn-lightest" aria-expanded="false">
                            {'Instance: ' + instance}
                        </button>
                        <button type="button" className="btn btn-primary dropdown-toggle dropdown-toggle-split" id="dropdownMenuReference" data-bs-toggle="dropdown" aria-expanded="false" data-bs-reference="parent">
                            <span className="visually-hidden">Toggle Dropdown</span>
                        </button>
                        <ul className="dropdown-menu">
                            {instances.map(i => <li
                                key={i}
                                className="dropdown-item cursor-pointer"
                                onClick={() => history.replace(getSurveyURL(i, availableSurveys.find(obj => obj.instance === i)?.surveys[0].name))}
                            >
                                {i}
                            </li>)}
                        </ul>
                    </div>
                </div>
                <div className="col-12 col-sm-4 mb-2 mb-sm-0">
                    {/* survey key selector */}
                    <div className="btn-group">
                        <button type="button" className="btn btn-lightest" aria-expanded="false">
                            {'Survey: ' + surveyKey}
                        </button>
                        <button type="button" className="btn btn-primary dropdown-toggle dropdown-toggle-split" id="dropdownMenuReference" data-bs-toggle="dropdown" aria-expanded="false" data-bs-reference="parent">
                            <span className="visually-hidden">Toggle Dropdown</span>
                        </button>
                        <ul className="dropdown-menu">
                            {
                                selectedInstanceObj?.surveys.map(
                                    survey => <li
                                        key={survey.name}
                                        className="dropdown-item cursor-pointer"
                                        onClick={() => history.replace(getSurveyURL(instance, survey.name))}
                                    >
                                        {survey.name}
                                    </li>
                                )
                            }
                        </ul>
                    </div>
                </div>
                <div className="col-12 col-sm-4">
                    {/* language selector */}
                    <div className="btn-group">
                        <button type="button" className="btn btn-lightest" aria-expanded="false">
                            {availableLanguages.find(l => l.code === selectedLanguage)?.label}
                        </button>
                        <button type="button" className="btn btn-primary dropdown-toggle dropdown-toggle-split" id="dropdownMenuReference" data-bs-toggle="dropdown" aria-expanded="false" data-bs-reference="parent">
                            <span className="visually-hidden">Toggle Dropdown</span>
                        </button>
                        <ul className="dropdown-menu">
                            {availableLanguages.map(l => <li
                                key={l.code}
                                className="dropdown-item cursor-pointer"
                                onClick={() => setSelectedLanguage(l.code)}
                            >
                                {l.label}
                            </li>)}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )


    return (
        <div className="container">
            <div className="row mt-3">
                <div className="col-12 col-lg-8 offset-lg-2">
                    <div className="border-bottom-2 border-top-2 border-primary py-1 mt-2 mb-2">
                        <h2 className="m-0">Survey Selector: </h2>
                    </div>
                    {surveySelector}
                    {survey ? <div>{renderSurveyNameAndDescription(survey)}</div> : null}

                </div>
            </div>

            <div className="row mt-3">
                <div className="col-12 col-lg-8 offset-lg-2">
                    <div className="border-bottom-2 border-top-2 border-primary py-1 mt-2 mb-2">
                        <h2 className="m-0">Survey Preview: </h2>
                    </div>

                    {survey ?
                        <div className="border-bottom-2 border-primary">
                            <SurveyView
                                survey={survey}
                                languageCode={selectedLanguage}
                                onSubmit={(resp) => {
                                    console.log(resp)
                                }}
                                submitBtnText={'submit'}
                                nextBtnText={'next'}
                                backBtnText={'previous'}
                            />
                        </div> : null}

                    <Box display="flex" alignItems="center" justifyContent="center">

                        <Box textAlign="center" p={2}>
                            <TextField
                                label="Study name"
                                variant="filled"

                                value={studyName}
                                onChange={(event) => {
                                    const v = event.target.value as string;
                                    setStudyName(v);
                                }}
                            >

                            </TextField>
                        </Box>

                        <Box textAlign="center" alignContent="center" p={2}>
                            <Button
                                color="primary"
                                variant="outlined"
                                onClick={() => {
                                    const exportData = {
                                        studyKey: studyName,
                                        survey: survey,
                                    }
                                    var a = document.createElement("a");
                                    var file = new Blob([JSON.stringify(exportData)], { type: 'json' });
                                    a.href = URL.createObjectURL(file);
                                    a.download = `${studyName}_${survey?.current.surveyDefinition.key}.json`;
                                    a.click();
                                }}>
                                Save Survey JSON
                </Button>
                        </Box>
                    </Box>

                    {/* <p>{t('title')}</p> */}
                </div >
            </div>
        </div >
    );
}

export default TestViewer;