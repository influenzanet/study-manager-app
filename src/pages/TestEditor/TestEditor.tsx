import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { generateCovid19Intake } from '../../editor-example-generators/covid-19-intake';
import { generateCovid19Weekly } from '../../editor-example-generators/covid-19-weekly';

const TestEditor: React.FC = () => {

    useEffect(() => {
        generateCovid19Weekly();
    }, [])


    return (
        <Container maxWidth={false}>

            <h1>Test</h1>
        </Container>
    );
}

export default TestEditor;