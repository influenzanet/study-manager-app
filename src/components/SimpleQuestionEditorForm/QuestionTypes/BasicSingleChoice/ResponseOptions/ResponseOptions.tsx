import React, { useState } from 'react';
import { ResponseOption, Expression, LocalizedString } from 'survey-engine/lib/data_types';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import Add from '@material-ui/icons/Add';
import Edit from '@material-ui/icons/Edit';

import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';

import { parseExpression, expressionToString } from '../../../../../utils/expression-parser';
import ExpressionCodeEditor from '../../../../ExpressionCodeEditor/ExpressionCodeEditor';
import { Paper, Collapse } from '@material-ui/core';
import { string, bool } from 'prop-types';

type ResponseOptionsProps = {
    responseOptions: Array<ResponseOption>;
    selectedLanguageCode: string;
    onAddOption: (newOption: ResponseOption) => void;
    onRemoveOption: (key: string) => void;
    onEditOptionKey: (key: string, newKey: string) => void;
    onEditOptionText: (key: string, newText: string) => void;
    onEditOptionDisplayCondition: (key: string, condition: Expression) => void;
}

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

const ResponseOptions: React.FC<ResponseOptionsProps> = (props) => {
    const classes = useStyles();

    const getCurrentItemTranslation = (item: ResponseOption): string => {
        if (!item || !item.content) {
            return '';
        }
        const cQ = item.content.find((ls: LocalizedString) => ls.code === props.selectedLanguageCode);
        return cQ.parts.join('');
    }

    const [conditionEditorOpen, setConditionEditorOpen] = useState('');

    const cancelExpressionEditor = () => {
        setConditionEditorOpen('');
    }

    return (
        <Grid container>



            {
                props.responseOptions.map(item =>
                    <Grid item xs={12}
                        key={item.key}
                    >
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="responseKey"
                                label="Response Key"
                                margin="normal"
                                variant="outlined"
                                value={item.key}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    event.preventDefault();
                                    props.onEditOptionKey(item.key, event.target.value)
                                }
                                }
                            />
                        </FormControl>
                        <FormControl className={classes.formControl}>
                            <TextField
                                id="responseText"
                                label="Response Text"
                                margin="normal"
                                variant="outlined"
                                value={getCurrentItemTranslation(item)}
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    event.preventDefault();
                                    props.onEditOptionText(item.key, event.target.value)
                                }
                                }
                            />
                        </FormControl>
                        <Collapse in={conditionEditorOpen !== item.key}>
                            {!item.displayCondition || item.displayCondition.name.length < 1 ? 'No condition' : expressionToString(item.displayCondition, 0)}
                            <IconButton
                                aria-label="open condition editor"
                                className={classes.margin}
                                onClick={() => setConditionEditorOpen(item.key)}
                            >
                                <Edit fontSize="inherit" />
                            </IconButton>
                        </Collapse>
                        <Collapse in={conditionEditorOpen === item.key}>
                            <Paper className={classes.padding}>
                                <h4>display condition</h4>
                                {<ExpressionCodeEditor
                                    expression={item.displayCondition}
                                    save={(exp) => {
                                        props.onEditOptionDisplayCondition(item.key, exp);
                                        setConditionEditorOpen('');
                                    }}
                                    cancel={cancelExpressionEditor}
                                ></ExpressionCodeEditor>}
                            </Paper>
                        </Collapse>

                        <hr />
                    </Grid>
                )
            }


            <Grid item xs={12}>
                <IconButton aria-label="add new response option"
                    onClick={() => {
                        props.onAddOption({
                            key: 'r' + props.responseOptions.length.toString(),
                            dtype: 'string',
                            role: 'response',
                            validations: []
                        });
                    }}
                >
                    <Add fontSize="inherit" />
                </IconButton>
            </Grid>
        </Grid>
    );
}

export default ResponseOptions;