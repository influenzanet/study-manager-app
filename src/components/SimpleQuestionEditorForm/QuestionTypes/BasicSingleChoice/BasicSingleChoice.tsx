import React, { useState } from 'react';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import clsx from 'clsx';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Add from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import { QComponent, LocalizedString, ResponseOption, Expression } from 'survey-engine/lib/data_types';
import ResponseOptions from './ResponseOptions/ResponseOptions';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        margin: {
            margin: theme.spacing(1),
        },
        padding: {
            padding: theme.spacing(2),
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            width: 200
        },
        expInput: {
            width: '70%',
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }),
);

const BasicSingleChoice: React.FC = () => {
    const classes = useStyles();

    const [newTranslationInputState, setNewTranslationInput] = useState('');
    const [translations, setTranslations] = useState<Array<string>>(['en']);
    const [selectedTranslation, setSelectedTranslation] = useState('en')

    const addNewTranslationHandler = () => {
        if (newTranslationInputState.length < 1 || translations.includes(newTranslationInputState)) {
            return;
        }

        // Add translation for question component
        setQuestionCompState(prev => {
            if (!prev || !prev.content) {
                return { ...prev };
            }
            prev.content.push({
                code: newTranslationInputState, parts: ['']
            });
            return {
                ...prev,
                content: prev.content.slice()
            };
        });

        // Add translation for description component
        setDescriptionCompState(prev => {
            if (!prev || !prev.content) {
                return { ...prev };
            }
            prev.content.push({
                code: newTranslationInputState, parts: ['']
            });
            return {
                ...prev,
                content: prev.content.slice()
            };
        });

        // Add translation for answer option components
        setResponseOptions(prev => {
            return prev.map(p => {
                if (!p || !p.content) {
                    return { ...p };
                }
                p.content.push({
                    code: newTranslationInputState, parts: ['']
                });
                return {
                    ...p,
                    content: p.content.slice()
                }
            });
        });

        setTranslations((prev => [...prev, newTranslationInputState]));
        setNewTranslationInput('');
        setSelectedTranslation(newTranslationInputState);
    }

    const selectTranslation = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedTranslation(event.target.value);
    }

    const defaultLangCode = 'en';
    const [questionCompState, setQuestionCompState] = useState<QComponent>({
        role: 'question',
        key: 'q',
        content: new Array<LocalizedString>(
            { code: defaultLangCode, parts: ['Test'] }
        ),
    });
    const [descriptionCompState, setDescriptionCompState] = useState<QComponent>({
        role: 'description',
        key: 'd',
        content: new Array<LocalizedString>(
            { code: defaultLangCode, parts: ['Testdescription'] }
        ),
    });

    // Question:
    const getCurrentQuestionTranslation = (): string => {
        if (!questionCompState || !questionCompState.content) {
            return '';
        }
        const cQ = questionCompState.content.find((ls: LocalizedString) => ls.code === selectedTranslation);
        return cQ.parts.join('');
    }

    const editCurrentQuestionTranslation = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!questionCompState || !questionCompState.content) {
            return '';
        }
        const cQI = questionCompState.content.findIndex((ls: LocalizedString) => ls.code === selectedTranslation);
        const newValue = event.target.value;

        if (cQI > -1) {
            setQuestionCompState((prev) => {
                if (!prev || !prev.content) {
                    return { ...prev };
                }
                prev.content[cQI].parts[0] = newValue;
                return {
                    ...prev,
                    content: prev.content.slice()
                };
            });
        }
    }

    // Description:
    const getCurrentDescriptionTranslation = (): string => {
        if (!descriptionCompState || !descriptionCompState.content) {
            return '';
        }
        const cQ = descriptionCompState.content.find((ls: LocalizedString) => ls.code === selectedTranslation);
        return cQ.parts.join('');
    }

    const editCurrentDescriptionTranslation = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (!descriptionCompState || !descriptionCompState.content) {
            return '';
        }
        const cQI = descriptionCompState.content.findIndex((ls: LocalizedString) => ls.code === selectedTranslation);
        const newValue = event.target.value;

        if (cQI > -1) {
            setDescriptionCompState((prev) => {
                if (!prev || !prev.content) {
                    return { ...prev };
                }
                prev.content[cQI].parts[0] = newValue;
                return {
                    ...prev,
                    content: prev.content.slice()
                };
            });
        }
    }

    // Response properties:
    const [answerOrdering, setAnswerOrdering] = useState('sequential');
    const [responseGroupKey, setResponseGroupKey] = useState('rg1');
    const [responseOptions, setResponseOptions] = useState<Array<ResponseOption>>([]);

    const onAddOption = (newOption: ResponseOption) => {
        setResponseOptions(
            prev => {
                newOption.content = new Array<LocalizedString>();
                translations.forEach(t => {
                    if (!newOption || !newOption.content) {
                        return;
                    }
                    newOption.content.push({
                        code: t,
                        parts: ['']
                    });
                });
                return [
                    ...prev, newOption
                ];
            });
    }

    const onEditRespOptionKey = (key: string, newKey: string) => {
        if (key.length < 1 || !responseOptions || responseOptions.findIndex(r => r.key === newKey) > -1) {
            return;
        }

        const idx = responseOptions.findIndex((item: ResponseOption) => item.key === key);

        if (idx < 0) {
            return;
        }

        setResponseOptions(prev => {
            prev[idx] = {
                ...prev[idx],
                key: newKey
            };
            return prev.slice();
        });
    }

    const onEditRespOptionDispCond = (key: string, newCond: Expression | undefined) => {
        if (key.length < 1 || !responseOptions) {
            return;
        }

        const idx = responseOptions.findIndex((item: ResponseOption) => item.key === key);
        if (idx < 0) {
            return;
        }

        setResponseOptions(prev => {
            prev[idx] = {
                ...prev[idx],
                displayCondition: newCond
            };
            return prev.slice();
        });
    }

    const onEditRespOptionText = (key: string, newText: string) => {
        if (key.length < 1 || !responseOptions) {
            return;
        }

        const idx = responseOptions.findIndex((item: ResponseOption) => item.key === key);
        if (idx < 0) {
            return;
        }

        setResponseOptions(prev => {
            const item = prev[idx];
            if (!item || !item.content) {
                return { ...prev };
            }
            const lIdx = item.content.findIndex((ls: LocalizedString) => ls.code === selectedTranslation);
            if (lIdx < 0) {
                return { ...prev };
            }

            item.content[lIdx].parts[0] = newText;
            prev[idx] = {
                ...item
            };

            return prev.slice();
        });
    }

    return (
        <Grid container>
            BasicSingleChoice
            <Grid item xs={12}>
                <h2>Translations</h2>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="translation-select">Translation</InputLabel>
                    <Select value={selectedTranslation} input={<Input id="translation-select"
                        onChange={selectTranslation}
                    />}>
                        {translations.map(t =>
                            <MenuItem key={t} value={t}>{t}</MenuItem>
                        )}
                    </Select>
                </FormControl>
                <FormControl className={clsx(classes.margin, classes.textField)}>
                    <InputLabel htmlFor="new_translation">Add new translation</InputLabel>
                    <Input
                        id="new_translation"
                        value={newTranslationInputState}
                        onChange={(event) => setNewTranslationInput(event.target.value)}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="add translation item"
                                    onClick={addNewTranslationHandler}
                                >
                                    <Add />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <h2>Question and description</h2>
                <FormControl className={clsx(classes.formControl, classes.expInput)}>
                    <TextField
                        id="questionText"
                        label="Question"
                        margin="normal"
                        multiline
                        variant="outlined"
                        value={getCurrentQuestionTranslation()}
                        onChange={editCurrentQuestionTranslation}
                    />
                </FormControl>
                <FormControl className={clsx(classes.formControl, classes.expInput)}>
                    <TextField
                        id="descriptionText"
                        label="Description (Optional)"
                        margin="normal"
                        multiline
                        variant="outlined"
                        value={getCurrentDescriptionTranslation()}
                        onChange={editCurrentDescriptionTranslation}
                    />
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <h2>Answer options</h2>
                <FormControl className={classes.formControl}>
                    <TextField
                        id="responseGroupKey"
                        label="Response Group Key"
                        margin="normal"
                        variant="outlined"
                        value={responseGroupKey}
                        onChange={(event) => setResponseGroupKey(event.target.value)}
                    />
                </FormControl>
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="order-select">Ordering</InputLabel>
                    <Select defaultValue={answerOrdering} input={<Input id="order-select"
                        onChange={(event) => setAnswerOrdering(event.target.value)}
                    />}>
                        <MenuItem value="sequential">sequential</MenuItem>
                        <MenuItem value="random">random</MenuItem>
                    </Select>
                </FormControl>
                <ResponseOptions
                    responseOptions={responseOptions}
                    selectedLanguageCode={selectedTranslation}
                    onAddOption={onAddOption}
                    onRemoveOption={(key) => { console.log('todo') }}
                    onEditOptionDisplayCondition={onEditRespOptionDispCond}
                    onEditOptionKey={onEditRespOptionKey}
                    onEditOptionText={onEditRespOptionText}
                ></ResponseOptions>

            </Grid>
            <Grid item xs={12}>
                Validation
            </Grid>

        </Grid>
    );
}

export default BasicSingleChoice;