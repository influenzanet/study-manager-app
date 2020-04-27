import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import { generateCovid19Intake } from '../../editor-example-generators/covid-19-intake';
// import { generateCovid19Weekly } from '../../editor-example-generators/covid-19-weekly';
import { generateCovid19Weekly } from '../../editor-example-generators/covid-sis-weekly';
import SurveyView from '../../components/survey/SurveyView/SurveyView';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';
import { Box, Button, TextField } from '@material-ui/core';
import { Survey } from 'survey-engine/lib/data_types';

const availableLanguages = [
    { code: 'en', label: '🇬🇧 English' },
    { code: 'de', label: '🇩🇪 Deutsch' },
]

const TestEditor: React.FC = () => {
    const [studyName, setStudyName] = useState('covid-19');

    useEffect(() => {
        const s = generateCovid19Weekly();
        setSurvey(s);
    }, [])

    // Language settings
    const [selectedLanguage, setSelectedLanguage] = useState('de');
    const [survey, setSurvey] = useState<Survey | undefined>();

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

    return (
        <Container maxWidth="lg">
            {languageSelector}
            {survey ? <SurveyView
                survey={survey}
                languageCode={selectedLanguage}
                onSubmit={(resp) => {
                    console.log(resp)
                }}
                submitBtnText={'submit'}
                nextBtnText={'next'}
                backBtnText={'previous'}
            /> : null}

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

export default TestEditor;