import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { parseExpression, expressionToString } from '../../utils/expression-parser';
import { ExpressionCodeEditorProps } from './ExpressionCodeEditorProps';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        margin: {
            margin: theme.spacing(0, 1),
        },
        expInput: {
            width: '100%',
        },
    }),
);


const ExpressionCodeEditor: React.FC<ExpressionCodeEditorProps> = (props) => {
    const classes = useStyles();

    const initExp = props.expression ? expressionToString(props.expression, 0) : '';
    const [exp, setExp] = useState(initExp);

    const expressionEdited = (event: React.ChangeEvent<HTMLInputElement>) => {
        // console.log(event.target.value);
        setExp(event.target.value);
    }

    const formatExpression = () => {
        const v = parseExpression(exp);
        if (v) {
            setExp(expressionToString(v, 0));
        }
    }

    const onSave = () => {
        const v = parseExpression(exp);
        if (!v) {
            console.error('could not parse expression code: ' + exp);
            return;
        }
        props.save(v);
    }

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <TextField
                    id="condition"
                    className={classes.expInput}
                    value={exp}
                    multiline
                    rowsMax="20"
                    label="Enter Expression Code"
                    margin="normal"
                    variant="outlined"
                    onChange={expressionEdited}
                />
            </Grid>
            <Grid item xs={12}>
                <Button className={classes.margin} onClick={formatExpression}>Format</Button>
                <Button
                    className={classes.margin}
                    onClick={onSave}
                    color="primary"
                >
                    Save</Button>

                <Button className={classes.margin} onClick={props.cancel} color="secondary">Cancel</Button>
            </Grid>
        </Grid>
    );
}

export default ExpressionCodeEditor;