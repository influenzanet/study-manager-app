import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import { generateCovid19Intake } from '../../editor-example-generators/covid-19-intake';
import { generateCovid19Weekly } from '../../editor-example-generators/covid-19-weekly';
// import { generateCovidSISWeekly } from '../../editor-example-generators/covid-sis-weekly';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';
import { Box } from '@material-ui/core';
import { Survey } from 'survey-engine/lib/data_types';
import ItemOverview from '../../components/SurveyEditor/ItemOverview/ItemOverview';

const availableLanguages = [
    { code: 'en', label: '🇬🇧 English' },
    { code: 'de', label: '🇩🇪 Deutsch' },
    { code: 'fr', label: '🇫🇷 Français' },
]

const TestEditor: React.FC = () => {
    useEffect(() => {
        const s = generateCovid19Weekly();
        // const s = generateCovid19Intake();
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
            {survey ? <ItemOverview
                survey={survey}
                languageCode={selectedLanguage}
            /> : null}
            {/* <p>{t('title')}</p> */}
        </Container >
    );
}

export default TestEditor;