import React from 'react';
import { studyRules } from '../editor-example-generators/nl/long-covid/studyRules';

interface StudyFileDownloadsProps {
}

const StudyFileDownloads: React.FC<StudyFileDownloadsProps> = (props) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            const exportData = studyRules;
                            var a = document.createElement("a");
                            var file = new Blob([JSON.stringify(exportData)], { type: 'json' });
                            a.href = URL.createObjectURL(file);
                            a.download = `study_rules.json`;
                            a.click();
                        }}>
                        {'Save Study Rules'}
                    </button>
                </div>
                <div className="col-6">

                </div>
            </div>

        </div>
    );
};

export default StudyFileDownloads;
