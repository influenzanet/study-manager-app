import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import TextField from '@material-ui/core/TextField';

import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { Expression } from 'survey-engine/lib/data_types';
import { parseExpression, expressionToString } from '../../utils/expression-parser';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        margin: {
            margin: theme.spacing(1),
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

    const [exp, setExp] = useState('  $or<boolean>(10, "no sense value here", $eq("valuehere", $getAttribute<string>($getResponse("s1.q1.g3.q1"), "testAttribute") ) )');

    let v = parseExpression('  $or<boolean>(10, "no sense value here", $eq("valuehere", $getAttribute<string>($getResponse("s1.q1.g3.q1"), "testAttribute") ) )');

    console.log(JSON.stringify(v, null, 2));
    if (v) {
        console.log(expressionToString(v, 0));
    }

    const expressionEdited = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        setExp(event.target.value);
    }

    const parseExp = () => {
        const v = parseExpression(exp);
        if (v) {
            setExp(expressionToString(v, 0));
        }
        console.log(JSON.stringify(v, null, 2));
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
                    <TextField
                        id="condition"
                        className={classes.expInput}
                        value={exp}
                        multiline
                        rowsMax="20"
                        label="Condition"
                        margin="normal"
                        variant="outlined"
                        onChange={expressionEdited}
                    />
                    <Button onClick={parseExp}>Submit Expression</Button>

                </Grid>
            </Grid>
        </form>

    );
}

export default SimpleQuestionEditorForm;