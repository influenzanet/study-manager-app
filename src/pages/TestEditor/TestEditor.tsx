import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import { generateCovid19Intake } from '../../editor-example-generators/covid-19-intake';
import { generateCovid19Weekly } from '../../editor-example-generators/covid-19-weekly';
import SurveyView from '../../components/survey/SurveyView/SurveyView';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';
import { Box, Button } from '@material-ui/core';
import { Survey } from 'survey-engine/lib/data_types';

const availableLanguages = [
    { code: 'en', label: '🇬🇧 English' },
    { code: 'de', label: '🇩🇪 Deutsch' },
]

const TestEditor: React.FC = () => {

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

            <Box textAlign="center" p={2}>
                <Button
                    color="primary"
                    variant="outlined"
                    onClick={() => {
                        var a = document.createElement("a");
                        var file = new Blob([JSON.stringify(survey)], { type: 'json' });
                        a.href = URL.createObjectURL(file);
                        a.download = 'survey.json';
                        a.click();
                    }}>
                    Save Survey JSON
            </Button>
            </Box>

            {/* <p>{t('title')}</p> */}
        </Container>
    );
}

export default TestEditor;