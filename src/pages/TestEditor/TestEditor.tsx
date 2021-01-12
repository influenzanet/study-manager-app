import React, { useEffect, useState } from 'react';
import Container from '@material-ui/core/Container';
import { generateCovid19Intake } from '../../editor-example-generators/covid-19-intake';
import { generateCovid19Weekly } from '../../editor-example-generators/covid-19-weekly';
// import { generateCovidSISWeekly } from '../../editor-example-generators/covid-sis-weekly';

import { Box } from '@material-ui/core';
import { Survey } from 'survey-engine/lib/data_types';
import ItemOverview from '../../components/SurveyEditor/ItemOverview/ItemOverview';


const TestEditor: React.FC = () => {
    useEffect(() => {
        const s = generateCovid19Weekly();
        // const s = generateCovid19Intake();
        setSurvey(s);
    }, [])

    // Language settings
    const [selectedLanguage, setSelectedLanguage] = useState('de');
    const [survey, setSurvey] = useState<Survey | undefined>();

    return (
        <Container maxWidth="lg">
            <p>todo</p>
            {survey ? <ItemOverview
                survey={survey}
                languageCode={selectedLanguage}
            /> : null}
            {/* <p>{t('title')}</p> */}
        </Container >
    );
}

export default TestEditor;