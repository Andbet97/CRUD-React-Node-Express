import '../css/ClientsList.css';
import 'date-fns';
import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment'
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {
    FormControl,
    OutlinedInput,
    InputAdornment,
    List,
    Button,
    ListItem,
    ListItemText,
    Zoom,
    Collapse,
    Card,
    CardActions,
    CardContent,
    Typography
} from '@material-ui/core';
import { ListItemClient } from './ListItemClient';


export const ClientList = () => {

    const [filter, setFilter] = useState('');
    const [filterDate, setFilterDate] = useState(new Date());
    const [query, setQuery] = useState({});
    const [clients, setClients] = useState([]);
    const [show, setShow] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        let qry = {...query}
        qry.name = filter
        setQuery(qry);
    }

    const handleDataSearch = () => {
        let qry = {...query}
        qry.createdAt = moment(filterDate, 'DD-MM-YYYY').format('YYYY-MM-DD');
        setQuery(qry);
        handleShowData();
    }

    const getUsers = () => {
        let URL = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : 'http://localhost:5000/api';
        URL += '/clients';

        if (Object.keys(query).length > 0) {
            URL += "?";
            Object.keys(query).map(q => (
                URL += (q + '=' + query[q] + "&")
            ));
        }

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
                    getUsers();
                }
            });
    }

    const handleFilter = (e) => {
        setFilter(e.target.value);
    }

    const handleStartData = (data) => {
        setFilterDate(data);
    }

    const handleShowData = () => {
        setShow(!show);
    }

    const handleCleanQuery = () => {
        setFilter('');
        setFilterDate(new Date());
        setQuery({});
    }

    useEffect(() => {
        getUsers();
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
                            <div className="row">
                                <form className="col-12 col-lg-6" id="search-form" onSubmit={handleSearch}>
                                    <FormControl fullWidth variant="outlined">
                                        <OutlinedInput
                                            id="search"
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <SearchIcon />
                                                </InputAdornment>
                                            }
                                            value={filter}
                                            onChange={handleFilter}
                                            placeholder="Buscar"
                                        />
                                    </FormControl>
                                </form>
                                <div className="col-12 col-lg-4 position-relative">
                                    <Card id="date-card"
                                        className="full-width ms-auto center-box"
                                    >
                                        <Collapse in={!show} timeout="auto">
                                            <CardActions disableSpacing>
                                                <ListItem
                                                    button
                                                    onClick={handleShowData}
                                                >
                                                    <ListItemText primary="Filtrar por fecha de creacion" />
                                                    {show ? <ExpandLess /> : <ExpandMore />}
                                                </ListItem>
                                            </CardActions>
                                        </Collapse>
                                        <Collapse in={show} timeout="auto">
                                            <Zoom in={show}>
                                                <CardContent>
                                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                        <KeyboardDatePicker
                                                        fullWidth
                                                            disableToolbar
                                                            variant="inline"
                                                            format="MM/dd/yyyy"
                                                            margin="normal"
                                                            label="Fecha"
                                                            value={filterDate}
                                                            onChange={handleStartData}
                                                            KeyboardButtonProps={{
                                                                'aria-label': 'change date',
                                                            }}
                                                        />
                                                    </MuiPickersUtilsProvider>
                                                    <div className="text-center mt-3">
                                                        <Button 
                                                            variant="contained"
                                                            color="primary"
                                                            onClick={handleDataSearch}
                                                            className="blue-color me-1"
                                                        >
                                                            Filtrar
                                                        </Button>
                                                        <Button 
                                                            variant="contained"
                                                            color="secondary"
                                                            onClick={handleShowData}
                                                            className="ms-1"
                                                        >
                                                            Cancelar
                                                        </Button>
                                                    </div>
                                                </CardContent>
                                            </Zoom>
                                        </Collapse>
                                    </Card>
                                </div>
                                <div className="col-12 col-lg-2 position-relative">
                                    <Button
                                        id="clean-button"
                                        onClick={handleCleanQuery}
                                        variant="contained"
                                        color="primary"
                                        className="blue-color center-box"
                                    >
                                        Limpiar filtros
                                    </Button>
                                </div>
                            </div>
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
