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

const SimpleQuestionEditorForm: React.FC = () => {
    const classes = useStyles();

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