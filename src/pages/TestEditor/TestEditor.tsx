import React, { useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { generateCovid19Intake } from '../../editor-example-generators/covid-19-intake';

const TestEditor: React.FC = () => {

    useEffect(() => {
        generateCovid19Intake();
    }, [])


    return (
        <Container maxWidth={false}>

            <h1>Test</h1>
        </Container>
    );
}

export default TestEditor;