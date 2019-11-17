import React from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';

import SimpleQuestionEditorForm from '../../components/SimpleQuestionEditorForm/SimpleQuestionEditorForm';

const TestEditor: React.FC = () => {

    return (
        <Container maxWidth={false}>
            <SimpleQuestionEditorForm></SimpleQuestionEditorForm>
            <h1>Test</h1>
            <Button variant="contained">
                Default
          </Button>
            <Button variant="contained" color="primary">
                Default
          </Button>
            <Button variant="contained" color="secondary">
                Default
          </Button>
        </Container>
    );
}

export default TestEditor;