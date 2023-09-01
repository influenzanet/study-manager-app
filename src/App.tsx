import React from 'react';
import {
    BrowserRouter as Router, Route, Redirect, Switch,
} from "react-router-dom";

import TestEditor from './pages/TestEditor/TestEditor';

import './App.css';
import TestViewer from './pages/TestViewer/TestViewer';
import StudyFileDownloads from './pages/StudyFileDownloads';

const App: React.FC = () => {

    return (
        <div>
            <Router>
                <Switch>
                    <Route path="/rules" component={StudyFileDownloads} />
                    <Route path="/preview/:instance/:surveyKey" component={TestViewer} />
                    <Redirect to="/preview/belgium/intake"></Redirect>
                </Switch>
            </Router>
        </div>
    );
}

export default App;
