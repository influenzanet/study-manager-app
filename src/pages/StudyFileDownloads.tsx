import { SelectField } from 'case-web-ui';
import React, { useState } from 'react';
import { studyRules } from '../editor-example-generators/nl/long-covid/studyRules';
import { emailConfigs } from '../editor-example-generators/nl/long-covid/emailRules';

interface StudyFileDownloadsProps {
}

const StudyFileDownloads: React.FC<StudyFileDownloadsProps> = (props) => {
    const [selectedEmailConfig, setSelectedEmailConfig] = useState("0");

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
                    <div className="d-flex">
                        <SelectField
                            value={selectedEmailConfig}
                            values={emailConfigs.map((conf, index) => { return { code: index.toString(), label: conf.label } })}
                            onChange={(event) => {
                                const value = event.target.value;
                                setSelectedEmailConfig(value);
                            }}
                        />
                        <button
                            className="btn btn-primary"
                            onClick={() => {
                                const exportData = emailConfigs[parseInt(selectedEmailConfig)];
                                var a = document.createElement("a");
                                var file = new Blob([JSON.stringify(exportData)], { type: 'json' });
                                a.href = URL.createObjectURL(file);
                                a.download = `${exportData.label.replaceAll(' ', '_')}.json`;
                                a.click();
                            }}>
                            {'Save Email Reminder Definition'}
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default StudyFileDownloads;
