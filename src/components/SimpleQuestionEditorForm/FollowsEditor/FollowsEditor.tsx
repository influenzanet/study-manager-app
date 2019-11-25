import React, { useState } from 'react';
import clsx from 'clsx';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import Chip from '@material-ui/core/Chip';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import Add from '@material-ui/icons/Add';
import Grid from '@material-ui/core/Grid';

export type FollowsEditorProps = {
    followsItems: Array<string>;
    onRemoveItem: (item: string) => void;
    onAddItem: (item: string) => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        margin: {
            margin: theme.spacing(1),
        },
        withoutLabel: {
            marginTop: theme.spacing(3),
        },
        textField: {
            width: 200,
        },
        itemList: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            '& > *': {
                margin: theme.spacing(0.5),
            },
        },
    }),
);

const FollowsEditor: React.FC<FollowsEditorProps> = (props) => {
    const classes = useStyles();

    const [newItemState, setNewItemValue] = useState('');

    const addClick = () => {
        if (newItemState.length > 0) {
            props.onAddItem(newItemState);
        }
    }


    const newItemEdited = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setNewItemValue(event.target.value);
    }

    return (
        <Grid container alignItems="center" className={classes.root}>
            <Grid item className={classes.itemList}>
                {
                    props.followsItems.map(item =>
                        <Chip
                            key={item}
                            label={item}
                            onDelete={() => props.onRemoveItem(item)}
                        />
                    )
                }
            </Grid>
            <Grid item>
                <FormControl className={clsx(classes.margin, classes.textField)}>
                    <InputLabel htmlFor="standard-adornment-password">New follows item</InputLabel>
                    <Input
                        id="new item field"
                        value={newItemState}
                        onChange={newItemEdited}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="add item"
                                    onClick={addClick}
                                >
                                    <Add />
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
            </Grid>
        </Grid>
    );
}

export default FollowsEditor;