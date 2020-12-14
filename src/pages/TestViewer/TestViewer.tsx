import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';

import SurveyView from '../../components/survey/SurveyView/SurveyView';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';
import { Box, Button, TextField, Typography, Paper, Select } from '@material-ui/core';
import { LocalizedString, LocalizedObject } from 'survey-engine/lib/data_types';

import availableSurveys from '../../editor-example-generators/surveys';

const availableLanguages = [
    { code: 'en', label: '🇬🇧 English' },
    { code: 'nl', label: 'NL Nederlands' },
    { code: 'de', label: '🇩🇪 Deutsch' },
    { code: 'fr', label: '🇫🇷 Français' },
]

const TestViewer: React.FC = () => {
    // const [studyName, setStudyName] = useState('covid-19');
    const [studyName, setStudyName] = useState('covid-19');

    const [selectedSurvey, setSelectedSurvey] = useState(availableSurveys[0]);

    // Language settings
    const [selectedLanguage, setSelectedLanguage] = useState('nl');

    const languageSelector = (
        <Box display="flex" justifyContent="center">
            <LanguageSelector
                selected={selectedLanguage}
                availableLanguages={availableLanguages}
                onChange={(lng) => {
                    setSelectedLanguage(lng);
                }}
            />
        </Box>
    )

    const getSurveyNameByLocaleCode = (translations: LocalizedObject[] | undefined, code: string): string | undefined => {
        if (!translations) { return; }
        const translation = (translations.find(cont => cont.code === code) as LocalizedString);
        if (!translation) { return }
        return translation.parts.map(p => p.str).join('');
    }

    const survey = selectedSurvey.survey;


    return (
        <Container maxWidth="lg">
            {languageSelector}
            {survey ?
                <Box>
                    <Paper>
                        <Box p={2}>
                            <Typography variant="h6">
                                {getSurveyNameByLocaleCode(survey.props?.name, selectedLanguage)}
                            </Typography>
                            <Typography variant="body1">
                                {getSurveyNameByLocaleCode(survey.props?.description, selectedLanguage)}
                            </Typography>
                            <Typography variant="body1">
                                {getSurveyNameByLocaleCode(survey.props?.typicalDuration, selectedLanguage)}
                            </Typography>
                        </Box>
                    </Paper>

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
                </Box>
                : null}

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
        </Container >
    );
}

export default TestViewer;