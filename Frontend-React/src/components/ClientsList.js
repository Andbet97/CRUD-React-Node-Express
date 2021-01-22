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
    ButtonGroup
} from '@material-ui/core';
import { ListItemClient } from './ListItemClient';


export const ClientList = () => {

    const [filter, setFilter] = useState('');
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [query, setQuery] = useState({});
    const [clients, setClients] = useState([]);
    const [show, setShow] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        let qry = {...query}
        qry.filter = filter
        setQuery(qry);
    }

    const handleDataSearch = () => {
        let qry = {...query}
        const now = moment(new Date(), 'DD-MM-YYYY').format('YYYY-MM-DD');
        qry.startDate = moment(startDate, 'DD-MM-YYYY').format('YYYY-MM-DD');
        const end = moment(endDate, 'DD-MM-YYYY').format('YYYY-MM-DD');
        if (end !== now) {
            qry.endDate = end;
        }
        setQuery(qry);
    }

    const handleFilter = (e) => {
        setFilter(e.target.value);
    }

    const handleStartData = (data) => {
        setStartDate(data);
    }

    const handleEndData = (data) => {
        setEndDate(data);
    }

    const handleShowData = () => {
        setShow(!show);
    }

    const handleCleanQuery = () => {
        setFilter('');
        setStartDate(new Date());
        setEndDate(new Date());
        setQuery({});
    }

    useEffect(() => {
        let URL = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : 'http://localhost:5000/api';
        axios
            .get(URL + '/clients')
            .then((res) => {
                setClients(res.data);
            });
        console.log(query);
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
                                        <CardActions disableSpacing>
                                            <ListItem
                                                button
                                                onClick={handleShowData}
                                            >
                                                <ListItemText primary="Filtrar por fecha" />
                                                {show ? <ExpandLess /> : <ExpandMore />}
                                            </ListItem>
                                        </CardActions>
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
                                                            label="Desde"
                                                            value={startDate}
                                                            onChange={handleStartData}
                                                            KeyboardButtonProps={{
                                                                'aria-label': 'change date',
                                                            }}
                                                        />
                                                    </MuiPickersUtilsProvider>
                                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                        <KeyboardDatePicker
                                                            fullWidth
                                                            disableToolbar
                                                            variant="inline"
                                                            format="MM/dd/yyyy"
                                                            margin="normal"
                                                            label="Hasta"
                                                            value={endDate}
                                                            onChange={handleEndData}
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
                                    clients.map((client, i) => (
                                        clients.length !== i + 1
                                            ? <ListItem key={client._id} divider>
                                                <ListItemClient client={client} />
                                            </ListItem>
                                            : <ListItem key={client._id}>
                                                <ListItemClient client={client} />
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
