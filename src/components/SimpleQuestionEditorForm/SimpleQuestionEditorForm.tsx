import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import TextField from '@material-ui/core/TextField';

import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

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
            width: 200,
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

const parseData = (dataStr: string): any => {
    dataStr = dataStr.trim();
    if (dataStr.length < 1) {
        return;
    }

    const commas: Array<number> = [];
    let openBrackets = 0;
    let openQuotes = false;
    for (let i = 0; i < dataStr.length; i++) {
        const ch = dataStr[i];
        if (ch === '"') {
            openQuotes = !openQuotes;
        } else if (ch === '(' && !openQuotes) {
            openBrackets += 1;
        } else if (ch === ')' && !openQuotes) {
            openBrackets -= 1;
        } else if (!openQuotes && !openBrackets && ch === ',') {
            commas.push(i);
        }
    }
    commas.push(dataStr.length);

    if (commas.length < 1) {
        console.log('parse string into single value');
        return dataStr;
    }
    let item: any = dataStr.slice(0, commas[0]).trim()
    if (item.length > 0) {
        if (item[0] === '$') {
            item = parseExpression(item);
        } else if( item[0] !== '"') {
            item = parseFloat(item);
        } else {
            item = item.slice(1, item.length - 1);
        }
    }
    let items = [
        item
    ];
    for (let i = 1; i < commas.length; i++) {
        item = dataStr.slice(commas[i-1]+1, commas[i]).trim();
        if (item.length > 0) {
            if (item[0] === '$') {
                item = parseExpression(item);
            } else if( item[0] !== '"') {
                item = parseFloat(item);
            } else {
                item = item.slice(1, item.length - 1);
            }
        }
        items.push( item );
    }

    return items;
}

const parseExpression = (exp: string): any => {
    exp = exp.trim();
    console.log(exp);

    if (exp.length < 1) {
        console.error('expression empty');
        return
    } else if (exp[0] !== '$') {
        console.error('wrong start character: ' + exp);
        return
    }

    const argStart = exp.indexOf('(');
    const argEnd = exp.lastIndexOf(')');

    const dtypeEnd = exp.lastIndexOf('>', argStart);
    const dtypeStart = exp.lastIndexOf('<', dtypeEnd);

    const dtype = (dtypeStart > -1 && dtypeEnd > -1) ?
        exp.slice(dtypeStart+1, dtypeEnd).trim() : undefined;

    const name = dtypeStart > -1 ? exp.slice(1, dtypeStart).trim(): exp.slice(1, argStart).trim();
    const data = (argStart >-1 && argEnd > -1)  ? parseData(exp.slice(argStart + 1, argEnd).trim()): undefined;

    let value: {
        name: string;
        dtype?: string;
        data?: any;
    } = {
        name: name,
    }
    if (dtype) {
        value['dtype'] = dtype;
    }
    if (data) {
        value['data'] = data;
    }

    return value;
}

const SimpleQuestionEditorForm: React.FC = () => {
    const classes = useStyles();

    const v = parseExpression('  $or(10, "no sense value here", $eq("valuehere", $getAttribute<string>($getResponse("s1.q1.g3.q1"), "testAttribute") ) )');

    console.log(JSON.stringify(v, null, 2));

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
            </Grid>
        </form>

    );
}

export default SimpleQuestionEditorForm;