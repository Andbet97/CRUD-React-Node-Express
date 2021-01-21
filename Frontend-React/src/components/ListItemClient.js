import React, { useState } from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import {
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    ListItemSecondaryAction,
    Button
} from '@material-ui/core';


export const ListItemClient = (props) => {

    const [client] = useState(props.client);

    return (
        <ListItem key={client._id}>
            <ListItemAvatar className="me-4">
                <Avatar id="avatar">
                    <AccountCircleIcon />
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={client.name} secondary={client.email} />
            <ListItemSecondaryAction>
                <div className="date">
                    {client.birthday_date} | {client.createdAt}
                </div>
                <Button variant="contained" color="primary" className="blue-color">
                    <CreateIcon />
                </Button>
                <Button variant="contained" color="secondary">
                    <DeleteIcon />
                </Button>
            </ListItemSecondaryAction>
        </ListItem>
    );
}