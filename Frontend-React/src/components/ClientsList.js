import '../css/ClientsList.css';
import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import {
    FormControl,
    OutlinedInput,
    InputAdornment,
    List,
    Divider
} from '@material-ui/core';
import { ListItemClient } from './ListItemClient';


export const ClientList = () => {

    const [querySearch, setQuerySearch] = useState('');
    const [clients, setClients] = useState([]);

    const handleSearch = (event) => {
        event.preventDefault();
        console.log(querySearch);
    }    

    useEffect(() => {
        async function fetchData() {
            let URL = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : 'http://localhost:5000/api';
            const res = await axios.get(URL+'/clients/');
            setClients(res.data);
        }
        fetchData();
    }, [clients]);

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
                        type="button"
                        className="btn btn-primary blue-color"
                    >
                        <AddIcon />
                        Nuevo cliente
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col-12 content-box">
                    <div className="row">
                        <div className="col-10 offset-1">
                            <form id="search-form" onSubmit={handleSearch}>
                                <FormControl fullWidth variant="outlined">
                                    <OutlinedInput
                                        id="search"
                                        startAdornment={
                                            <InputAdornment position="start">
                                                <SearchIcon />
                                            </InputAdornment>
                                        }
                                        value={querySearch}
                                        onChange={(e) => setQuerySearch(e.target.value)}
                                        placeholder="Buscar"
                                    />
                                </FormControl>
                            </form>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-10 offset-1">
                            <List>
                                {
                                    clients.map((client, i) => ( 
                                        <Fragment>
                                            <ListItemClient key={client._id} client={client}/> 
                                            { 
                                                clients.length === i + 1 
                                                    ? null
                                                    : <Divider key={client._id+'divider'} variant="fullWidth" component='li'/>
                                            }
                                        </Fragment>
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
