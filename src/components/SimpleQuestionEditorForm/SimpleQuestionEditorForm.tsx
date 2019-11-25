import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Edit from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';

import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { Expression } from 'survey-engine/lib/data_types';
import { parseExpression, expressionToString } from '../../utils/expression-parser';
import ExpressionCodeEditor from '../ExpressionCodeEditor/ExpressionCodeEditor';
import { Paper, Collapse } from '@material-ui/core';
import FollowsEditor from './FollowsEditor/FollowsEditor';


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

const SimpleQuestionEditorForm: React.FC = () => {
    const classes = useStyles();

    const [exp, setExp] = useState<Expression>({ name: '' });
    const [conditionEditorOpen, setConditionEditorOpen] = useState(false);

    const [follows, setFollows] = useState<Array<string>>(['s1.g1.q1']);

    let v = parseExpression('  $or<boolean>(10, "no sense value here", $eq("valuehere", $getAttribute<string>($getResponse("s1.q1.g3.q1"), "testAttribute") ) )');

    console.log(JSON.stringify(v, null, 2));
    if (v) {
        console.log(expressionToString(v, 0));
    }

    const expressionChanged = (newExpression: Expression) => {
        setExp(newExpression);
        setConditionEditorOpen(false);
    }

    const cancelExpressionEditor = () => {
        setConditionEditorOpen(false);
    }

    const addFollowsItemHandler = (item: string) => {
        setFollows(prev => {
            if (prev.includes(item)) {
                return prev;
            }
            return [...prev, item];
        });
    }

    const removeFollowsItemHandler = (item: string) => {
        setFollows(prev => prev.filter(it => it !== item));
    }


    return (
        <form noValidate autoComplete="off">
            <Grid container className={classes.root} spacing={2}>
                <Grid item xs={12}>
                    <IconButton aria-label="back" className={classes.margin}>
                        <ArrowBack fontSize="inherit" />
                    </IconButton>
                    <span>SimpleQuestionEditorForm</span>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="parent-key"
                        className={classes.textField}
                        label="Parent-Key"
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="key"
                        className={classes.textField}
                        label="Key"
                        margin="normal"
                        variant="outlined"
                    />
                </Grid>
                <Grid item >
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="question-type-select">Type</InputLabel>
                        <Select defaultValue="" input={<Input id="question-type-select" />}>
                            <ListSubheader>Basic</ListSubheader>
                            <MenuItem value={1}>Option 1</MenuItem>
                            <MenuItem value={2}>Option 2</MenuItem>
                            <ListSubheader value={2}>Concepts</ListSubheader>
                            <MenuItem value={3}>Option 3</MenuItem>
                            <MenuItem value={4}>Option 4</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <h3>Condition</h3>
                    <Collapse in={!conditionEditorOpen}>
                        {exp.name.length < 1 ? 'No condition' : expressionToString(exp, 0)}
                        <IconButton
                            aria-label="open condition editor"
                            className={classes.margin}
                            onClick={() => setConditionEditorOpen(true)}
                        >
                            <Edit fontSize="inherit" />
                        </IconButton>
                    </Collapse>
                    <Collapse in={conditionEditorOpen}>
                        <Paper className={classes.padding}>
                            <ExpressionCodeEditor
                                expression={exp}
                                save={expressionChanged}
                                cancel={cancelExpressionEditor}
                            ></ExpressionCodeEditor>
                        </Paper>
                    </Collapse>

                </Grid>

                <Grid item xs={12}>
                    <h3>Follows:</h3>
                    <FollowsEditor
                        followsItems={follows}
                        onAddItem={addFollowsItemHandler}
                        onRemoveItem={removeFollowsItemHandler}
                     ></FollowsEditor>
                </Grid>
            </Grid>
        </form>

    );
}

export default SimpleQuestionEditorForm;