import React, { useEffect, useState } from 'react';

import { Box, Button } from '@material-ui/core';
import { LocalizedString, LocalizedObject, Survey } from 'survey-engine/lib/data_types';

import availableSurveys from '../../editor-example-generators/surveys';
import { useHistory, useParams } from 'react-router-dom';
import { Checkbox, SelectField, SurveyView, TextField } from 'case-web-ui';


const getSurveyURL = (instance: string, surveyKey?: string): string => {
    return `/preview/${instance}/${surveyKey}`;
}

const TestViewer: React.FC = () => {
    const [studyName, setStudyName] = useState('covid-19');
    let { instance, surveyKey } = useParams<{ instance: string; surveyKey: string; }>();
    const history = useHistory();


    const [pFlagKey, setPFlagKey] = useState('');
    const [pFlagValue, setPFlagValue] = useState('');
    const [showKeys, setShowKeys] = useState(false);

    // Language settings
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const [selectedSurvey, setSelectedSurvey] = useState<Survey | undefined>();

    const instances = availableSurveys.map(obj => obj.instance);
    const selectedInstanceObj = availableSurveys.find(obj => obj.instance === instance);

    useEffect(() => {
        const selected = selectedInstanceObj?.surveys.find(obj => obj.name === surveyKey);
        if (!selected) {
            return;
        }
        if (selectedInstanceObj && selectedInstanceObj.languageCodes.length > 0) {
            setSelectedLanguage(selectedInstanceObj.languageCodes[0]);
        }
        setSelectedSurvey(selected.survey);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [instance, surveyKey]);

    console.log(selectedSurvey);


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
                <div className="col-12 mb-2">
                    {/* instance selector */}
                    <div className="mb-1">Instance:</div>
                    <SelectField
                        value={instance}
                        values={instances.map(i => { return { code: i, label: i } })}
                        onChange={(event) => {
                            const i = event.target.value;
                            history.replace(getSurveyURL(i, availableSurveys.find(obj => obj.instance === i)?.surveys[0].name))
                        }}
                    />
                </div>
                <div className="col-12 mb-2">
                    {/* survey key selector */}
                    <div className="mb-1">Survey:</div>
                    <SelectField
                        value={surveyKey}
                        values={selectedInstanceObj?.surveys.map(survey => { return { code: survey.name, label: survey.name } })}
                        onChange={(event) => {
                            const value = event.target.value;
                            history.replace(getSurveyURL(instance, value))
                        }}
                    />
                </div>
                <div className="col-12">
                    {/* language selector */}
                    <div className="mb-1">Language:</div>
                    <SelectField
                        value={selectedLanguage}
                        values={selectedInstanceObj?.languageCodes.map(l => { return { code: l, label: l } })}
                        onChange={(event) => {
                            const value = event.target.value;
                            setSelectedLanguage(value)
                        }}
                    />
                </div>
            </div>
        </div>
    )


    return (
        <div className="container-fluid">


            <div className="row mt-3">
                <div className="col-12 col-lg-4">
                    <div className="border-bottom-2 border-top-2 border-primary py-1 mt-2 mb-2">
                        <h2 className="m-0">Survey Selector: </h2>
                    </div>
                    {surveySelector}
                    {survey ? <div>{renderSurveyNameAndDescription(survey)}</div> : null}

                    <div className="py-2a px-2 px-sm-3 bg-grey-1 my-2">
                        <h5>Participant flags</h5>
                        <TextField label="Key" value={pFlagKey} onChange={(event) => setPFlagKey(event.target.value)} />
                        <TextField label="Value" value={pFlagValue} onChange={(event) => setPFlagValue(event.target.value)} />
                        <Checkbox
                            id="showKeys"
                            className="mt-2"
                            name="showKeys"
                            checked={showKeys}
                            label="Show Item Keys" onChange={(value) => setShowKeys(value)} />
                    </div>
                </div>
                <div className="col-12 col-lg-8">
                    <div className="border-bottom-2 border-top-2 border-primary py-1 mt-2 mb-2">
                        <h2 className="m-0">Survey Preview: </h2>
                    </div>

                    {survey ?
                        <div className="border-bottom-2 border-primary pb-2">
                            <SurveyView
                                survey={survey}
                                languageCode={selectedLanguage}
                                onSubmit={(resp) => {
                                    console.log(resp)
                                }}
                                context={{
                                    participantFlags: {
                                        [pFlagKey]: pFlagValue,
                                    }
                                }}
                                submitBtnText={'Submit'}
                                // submitBtnText={'Verzenden'}
                                nextBtnText={'Next Page'}
                                // nextBtnText={'Volgende'}
                                // backBtnText={'Vorige'}
                                backBtnText={'Back'}
                                invalidResponseText={'Please select a valid response.'}
                                showKeys={showKeys}
                            />
                        </div> : null}

                    <Box display="flex" alignItems="center" justifyContent="center">

                        <Box textAlign="center" p={2}>
                            <div className="bg-primary p-2">
                                <TextField
                                    label="Study name"
                                    value={studyName}
                                    onChange={(event) => {
                                        const v = event.target.value as string;
                                        setStudyName(v);
                                    }}
                                >

                                </TextField>
                            </div>
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
