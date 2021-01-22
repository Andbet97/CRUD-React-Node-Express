import '../css/ClientsList.css';
import 'date-fns';
import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import {
    List,
    Button,
    ListItem,
    Typography
} from '@material-ui/core';
import { ListItemClient } from './ListItemClient';
import { Search } from './Search';


export const ClientList = () => {

    const [query, setQuery] = useState({});
    const [clients, setClients] = useState([]);

    const getURL = () => {
        let URL = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : 'http://localhost:5000/api';
        URL += '/clients';

        if (Object.keys(query).length > 0) {
            URL += "?";
            Object.keys(query).map(q => (
                URL += (q + '=' + query[q] + "&")
            ));
        }
    }

    const getUsers = (URL) => {
        axios
            .get(URL)
            .then((res) => {
                setClients(res.data);
            });
    }

    const handleDelete = (id) => {
        let URL = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : 'http://localhost:5000/api';
        axios
            .delete(URL + '/clients/' + id)
            .then((res) => {
                if (res.status === 200) {
                    const URL = getURL();
                    getUsers(URL);
                }
            });
    }

    useEffect(() => {
        let URL = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : 'http://localhost:5000/api';
        URL += '/clients';

        if (Object.keys(query).length > 0) {
            URL += "?";
            Object.keys(query).map(q => (
                URL += (q + '=' + query[q] + "&")
            ));
        }
        getUsers(URL);
    }, [query]);

    return (
        <Fragment>
            <div className="row">
                <div className="col-6 col-md-9 col-lg-10">
                    <h1>Listado clientes</h1>
                </div>
                <div className="col-6 col-md-3 col-lg-2">
                    <Link
                        to="/client/create"
                        id="new-client"
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            className="blue-color"
                            startIcon={<AddIcon />}
                        >
                            Nuevo cliente
                        </Button>
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col-12 content-box">
                    <div className="row">
                        <div className="col-10 offset-1">
                            <Search query={query} setQuery={setQuery} />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-10 offset-1">
                            <List>
                                {
                                    clients.length === 0
                                        ? <Typography>No se han encontrado usuarios</Typography>
                                        : clients.map((client, i) => (
                                            clients.length !== i + 1
                                                ? <ListItem key={client._id} divider>
                                                    <ListItemClient handleDelete={handleDelete} client={client} />
                                                </ListItem>
                                                : <ListItem key={client._id}>
                                                    <ListItemClient handleDelete={handleDelete} client={client} />
                                                </ListItem>
                                        ))
                                }
                            </List>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
