import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ExpandLess from '@material-ui/icons/ExpandLess';
import moment from 'moment';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import {
    FormControl,
    OutlinedInput,
    InputAdornment,
    Button,
    ListItem,
    ListItemText,
    Zoom,
    Collapse,
    Card,
    CardActions,
    CardContent
} from '@material-ui/core';


export const Search = (props) => {

    const { query, setQuery } = props;

    const [filter, setFilter] = useState('');
    const [filterDate, setFilterDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        let qry = { ...query }
        qry.name = filter
        setQuery(qry);
    }

    const handleDataSearch = () => {
        let qry = { ...query }
        qry.createdAt = moment(filterDate, 'DD-MM-YYYY').format('YYYY-MM-DD');
        setQuery(qry);
        handleShowData();
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

    return (
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

    );
}