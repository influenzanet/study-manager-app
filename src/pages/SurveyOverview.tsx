import { Dialog, SelectField, SurveySingleItemView } from 'case-web-ui';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { ExpressionArg, isItemGroupComponent, isSurveyGroupItem, ItemComponent, LocalizedObject, LocalizedString, Survey, SurveyItem, SurveySingleItem } from 'survey-engine/data_types';
import availableSurveys from '../editor-example-generators/surveys';
import clsx from 'clsx';

interface SurveyOverviewProps {
}

const getSurveyURL = (instance: string, surveyKey?: string): string => {
    return `/overview/${instance}/${surveyKey}`;
}

const getSurveySingleItems = (surveyItem: SurveyItem): SurveySingleItem[] => {
    if (!isSurveyGroupItem(surveyItem)) {
        return [surveyItem];
    }
    const items: SurveySingleItem[] = [];
    surveyItem.items.forEach(item => {
        items.push(...getSurveySingleItems(item));
    })
    return items;
}

const getItemTitle = (item: SurveySingleItem, lang: string): string => {

    const filtered = item.components?.items.filter(c => c.role === 'title');
    if (!filtered || filtered.length < 1) {
        return "-";
    }

    const cWithLang = filtered[0].content?.filter(c => c.code === lang);
    if (!cWithLang || cWithLang.length < 1) {
        return '-';
    }
    return (cWithLang[0] as LocalizedString).parts.map(p => (p as ExpressionArg).str).join('');
}

const renderCompTexts = (comp: ItemComponent): ItemComponent => {
    let items: ItemComponent[] | undefined = undefined;
    if (isItemGroupComponent(comp)) {
        items = comp.items.map(it => { return renderCompTexts(it) });
    }

    return {
        ...comp,
        items: items ? [...items] : undefined,
        content: comp.content?.map(cCont => {
            const l = cCont as LocalizedString;
            l.resolvedText = l.parts.map(p => (p as ExpressionArg).str).join('');
            return {
                ...l,
            }
        }),
        description: comp.description?.map(cDesc => {
            const l = cDesc as LocalizedString;
            l.resolvedText = l.parts.map(p => (p as ExpressionArg).str).join('');
            return {
                ...l,
            }
        })
    }
}

const renderTexts = (item: SurveySingleItem): SurveySingleItem => {
    const rItem = { ...item };

    rItem.components?.items.map(c => {
        const rC = renderCompTexts(c);
        return rC;
    })
    return rItem;
}

const SurveyOverview: React.FC<SurveyOverviewProps> = (props) => {
    let { instance, surveyKey } = useParams<{ instance: string; surveyKey: string; }>();
    const history = useHistory();

    const [selectedItem, setSelectedItem] = useState<SurveySingleItem | undefined>();

    // Language settings
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const [selectedSurvey, setSelectedSurvey] = useState<Survey | undefined>();

    const instances = availableSurveys.map(obj => obj.instance);
    const selectedInstanceObj = availableSurveys.find(obj => obj.instance === instance);

    useEffect(() => {
        const selected = selectedInstanceObj?.surveys.find(obj => obj.name === surveyKey);
        if (!selected) {
            return;
        }
        if (selectedInstanceObj && selectedInstanceObj.languageCodes.length > 0) {
            setSelectedLanguage(selectedInstanceObj.languageCodes[0]);
        }
        setSelectedSurvey(selected.survey);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [instance, surveyKey]);

    console.log(selectedSurvey);
    const surveyItems = selectedSurvey ? getSurveySingleItems(selectedSurvey.surveyDefinition) : [];
    console.log(surveyItems);


    const getSurveyNameByLocaleCode = (translations: LocalizedObject[] | undefined, code: string): string | undefined => {
        if (!translations) { return; }
        const translation = (translations.find(cont => cont.code === code) as LocalizedString);
        if (!translation) { return }
        return translation.parts.map(p => (p as ExpressionArg).str).join('');
    }

    const survey = selectedSurvey;

    const renderSurveyNameAndDescription = (survey: Survey) => (
        <div className="py-2a px-2 px-sm-3 bg-grey-1">
            <div className="mb-2">
                <h5 className="d-inline fw-bold">
                    {getSurveyNameByLocaleCode(survey.props?.name, selectedLanguage)}
                </h5>
                <span className="ms-2 text-primary">
                    {getSurveyNameByLocaleCode(survey.props?.typicalDuration, selectedLanguage)}
                </span>
            </div>
            <p className="mb-0 fst-italic">
                {getSurveyNameByLocaleCode(survey.props?.description, selectedLanguage)}
            </p>

        </div>
    );


    const surveySelector = (
        <div className="py-2a px-2 px-sm-3 bg-grey-1 mb-2">
            <div className="row">
                <div className="col-12 mb-2">
                    {/* instance selector */}
                    <div className="mb-1">Instance:</div>
                    <SelectField
                        value={instance}
                        values={instances.map(i => { return { code: i, label: i } })}
                        onChange={(event) => {
                            const i = event.target.value;
                            history.replace(getSurveyURL(i, availableSurveys.find(obj => obj.instance === i)?.surveys[0].name))
                        }}
                    />
                </div>
                <div className="col-12 mb-2">
                    {/* survey key selector */}
                    <div className="mb-1">Survey:</div>
                    <SelectField
                        value={surveyKey}
                        values={selectedInstanceObj?.surveys.map(survey => { return { code: survey.name, label: survey.name } })}
                        onChange={(event) => {
                            const value = event.target.value;
                            history.replace(getSurveyURL(instance, value))
                        }}
                    />
                </div>
                <div className="col-12">
                    {/* language selector */}
                    <div className="mb-1">Language:</div>
                    <SelectField
                        value={selectedLanguage}
                        values={selectedInstanceObj?.languageCodes.map(l => { return { code: l, label: l } })}
                        onChange={(event) => {
                            const value = event.target.value;
                            setSelectedLanguage(value)
                        }}
                    />
                </div>
            </div>
        </div>
    )

    return (
        <div className="container-fluid">
            <div className="row mt-3">
                <div className="col-12 ">
                    <div className="border-bottom-2 border-top-2 border-primary py-1 mt-2 mb-2">
                        <h2 className="m-0">Survey Selector: </h2>
                    </div>
                    {surveySelector}
                    {survey ? <div>{renderSurveyNameAndDescription(survey)}</div> : null}

                </div>
                <div className="col-12 ">
                    <div className="border-bottom-2 border-top-2 border-primary py-1 mt-2 mb-2">
                        <h2 className="m-0">Survey Overview: </h2>
                    </div>

                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Key</th>
                                <th scope="col">Title</th>
                                <th scope="col">Cond.</th>
                                <th scope="col">Req.</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                surveyItems.map((item, index) => {



                                    let isRequired = false;
                                    if (item.validations && item.validations.filter(f => f.type === 'hard').length > 0) {
                                        isRequired = true;
                                    }
                                    const hasCondition = item.condition !== undefined;
                                    return <tr
                                        key={item.key}
                                        className={clsx({
                                            'table-light': item.type === 'pageBreak',
                                            'table-success': item.type === 'surveyEnd',
                                        })}
                                        onClick={() => setSelectedItem(item)}
                                    >
                                        <th scope="row">{index}</th>
                                        <td>{item.key}</td>
                                        <td>{getItemTitle(item, selectedLanguage)}</td>
                                        <td>{hasCondition ? 'yes' : 'no'}</td>
                                        <td>{isRequired ? 'yes' : 'no'}</td>
                                    </tr>

                                })
                            }
                        </tbody>
                    </table>
                    {
                        selectedItem ? <Dialog
                            open={true}
                            title={`Item preview: ${selectedItem.key}`}
                            onClose={() => setSelectedItem(undefined)}
                            ariaLabelledBy={'key'}
                        // preferredWidth={600}

                        >
                            <SurveySingleItemView
                                languageCode={selectedLanguage}
                                invalidWarning={'Warning'}
                                renderItem={renderTexts(selectedItem)}
                                responseChanged={() => { }}
                            //showKeys={true}
                            />
                        </Dialog> : null
                    }




                    {/* <p>{t('title')}</p> */}
                </div >
            </div>
        </div >
    );
};

export default SurveyOverview;
