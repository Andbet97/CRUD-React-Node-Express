import React, { Fragment } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import moment from 'moment';
import 'moment/locale/es';
import {
    ListItemAvatar,
    Avatar,
    ListItemText,
    ListItemSecondaryAction,
    Button
} from '@material-ui/core';


export const ListItemClient = (props) => {

    const { handleDelete, client } = props

    moment.locale('es');

    const formatDate = (datetime) => {
        const date = datetime.split('T')[0];
        return moment(date).format("DD MMMM YYYY");
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
                <Button onClick={() => handleDelete(client._id)} variant="contained" color="secondary">
                    <DeleteIcon />
                </Button>
            </ListItemSecondaryAction>
        </Fragment>
    );
}