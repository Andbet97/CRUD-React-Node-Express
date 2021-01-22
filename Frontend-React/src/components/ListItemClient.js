import React, { useState, Fragment } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import moment from 'moment';
import {
    ListItemAvatar,
    Avatar,
    ListItemText,
    ListItemSecondaryAction,
    Button
} from '@material-ui/core';


export const ListItemClient = (props) => {

    moment.locale('es');

    const [client] = useState(props.client);

    const formatDate = (date) => {
        return moment(date).format("MMM Do YYYY");
    }

    return (
        <Fragment>
            <ListItemAvatar className="me-4">
                <Avatar id="avatar">
                    <AccountCircleIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={client.name} secondary={client.email} />
            <ListItemSecondaryAction>
                <div className="date">
                    {formatDate(client.birthday_date)} | {formatDate(client.createdAt)}
                </div>
                <Button variant="contained" color="primary" className="blue-color">
                    <CreateIcon />
                </Button>
                <Button variant="contained" color="secondary">
                    <DeleteIcon />
                </Button>
            </ListItemSecondaryAction>
        </Fragment>
    );
}