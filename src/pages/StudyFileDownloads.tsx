import React, { useState } from 'react';
import { studyRules } from '../editor-example-generators/belgium/studyRules';
import { customRules } from '../editor-example-generators/belgium/customRules';

interface StudyFileDownloadsProps {
}

const StudyFileDownloads: React.FC<StudyFileDownloadsProps> = (props) => {

    return (
        <div className="container">
            <div className="row">
                <div className="col-2">
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            const exportData = studyRules;
                            var a = document.createElement("a");
                            var file = new Blob([ JSON.stringify(exportData, undefined, 2) ], { type: 'json' });
                            a.href = URL.createObjectURL(file);
                            a.download = `studyRules.json`;
                            a.click();
                        }}>
                        {'Save Study Rules'}
                    </button>
                </div>
                {customRules.map(rule =>
                    <div className="col-2">
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                const exportData = rule.rules;
                                var a = document.createElement("a");
                                var file = new Blob([ JSON.stringify(exportData, undefined, 2) ], { type: 'json' });
                                a.href = URL.createObjectURL(file);
                                a.download = `${rule.name}_rules.json`;
                                a.click();
                            }}>
                            {`Save ${rule.name} rule`}
                        </button>
                    </div>)}
            </div>
        </div>
    );
};

export default StudyFileDownloads;
