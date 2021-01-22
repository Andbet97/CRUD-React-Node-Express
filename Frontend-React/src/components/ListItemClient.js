import React, { Fragment } from 'react';
import { useHistory } from "react-router-dom";
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
import { ConfirmAlert } from './ConfirmAlert';


export const ListItemClient = (props) => {

    const { handleDelete, client } = props

    let history = useHistory();

    moment.locale('es');

    const formatDate = (datetime) => {
        const date = datetime.split('T')[0];
        return moment(date).format("DD MMMM YYYY");
    }

    const handleEdit = (id) => {
        const path = '/client/edit/'+id; 
        history.push(path);
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
                <Button 
                    variant="contained"
                    onClick={() => handleEdit(client._id)}
                    color="primary"
                    className="blue-color"
                >
                    <CreateIcon />
                </Button>
                <ConfirmAlert 
                    buttonprops={{variant:"contained", color:"secondary"}}
                    buttoncontent={<DeleteIcon />}
                    title="Eliminar cliente."
                    message="Una vez eliminado el cliente se borrara toda su información. ¿Está seguro?"
                    handleClickAgree={() => handleDelete(client._id)}
                />
            </ListItemSecondaryAction>
        </Fragment>
    );
}