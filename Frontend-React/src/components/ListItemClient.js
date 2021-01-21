import React, { useState } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import { makeStyles } from '@material-ui/core/styles';
import {
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    ListItemSecondaryAction,
    Button
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
}));


export const ListItemClient = (props) => {

    const [client] = useState(props.client);
    const classes = useStyles();

    return (
        <ListItem key={client._id}>
            <ListItemAvatar className="me-4">
                <Avatar className={classes.large}>
                    <AccountCircleIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={client.name} secondary={client.email} />
            <ListItemSecondaryAction>
                <div className="date">
                    {client.birthday_date} | {client.createdAt}
                </div>
                <Button variant="contained" color="primary">
                    <CreateIcon />
                </Button>
                <Button variant="contained" color="secondary">
                    <DeleteIcon />
                </Button>
            </ListItemSecondaryAction>
        </ListItem>
    );
}