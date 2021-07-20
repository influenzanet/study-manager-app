import React from 'react';
import {
    BrowserRouter as Router, Route, Redirect, Switch,
} from "react-router-dom";

import TestEditor from './pages/TestEditor/TestEditor';

import './App.css';
import TestViewer from './pages/TestViewer/TestViewer';
import StudyFileDownloads from './pages/StudyFileDownloads';
import SurveyOverview from './pages/SurveyOverview';

const App: React.FC = () => {

    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/test-editor" component={TestEditor} />
                    <Route path="/test-study-download" component={StudyFileDownloads} />
                    <Route path="/overview/:instance/:surveyKey" component={SurveyOverview} />
                    <Route path="/preview/:instance/:surveyKey" component={TestViewer} />
                    <Redirect to="/preview/nl/intake"></Redirect>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
