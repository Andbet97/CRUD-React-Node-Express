import 'date-fns';
import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { FormHelperText, Grid } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';


const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

export const Form = (props) => {

    const classes = useStyles();

    const { name, dni, birthday_date, email, errors } = props.states;
    const { setName, setDni, setBirthday_date, setEmail } = props.setStates;

    const handleChangeName = (e) => {
        setName(e.target.value);
    }

    const handleChangeDni = (e) => {
        setDni(e.target.value);
    }

    const handleChangeBirthday_date = (date) => {
        setBirthday_date(date);
    }

    const handleChangeEmail = (e) => {
        setEmail(e.target.value);
    }

    return (
        <Fragment>
            <div className="row flex-box">
                <div>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                        className="mb-5"
                    >
                        <Grid item md={12} lg={7}>
                            <FormControl error={ errors.name ? true : false } fullWidth className={classes.margin} variant="outlined">
                                <InputLabel htmlFor="name-input">Nombre completo</InputLabel>
                                <Input 
                                    id="name-input"
                                    aria-describedby="name-helper-text"
                                    type="text"
                                    value={name}
                                    onChange={handleChangeName}
                                    required
                                />
                                { 
                                    errors.name 
                                        ? <FormHelperText id="name-helper-text">{errors.name}</FormHelperText>
                                        : null
                                }
                            </FormControl>
                        </Grid>
                        <Grid item md={12} lg={4}>
                            <FormControl error={ errors.dni ? true : false } fullWidth className={classes.margin} variant="outlined">
                                <InputLabel htmlFor="dni-input">Número de documento</InputLabel>
                                <Input 
                                    id="dni-input"
                                    aria-describedby="dni-helper-text"
                                    type="number"
                                    value={dni}
                                    onChange={handleChangeDni}
                                    required
                                />
                                { 
                                    errors.dni 
                                        ? <FormHelperText id="dni-helper-text">{errors.dni}</FormHelperText>
                                        : null
                                }
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                        className="mt-3 mb-5"
                    >
                        <Grid item md={12} lg={4}>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                    fullWidth
                                    disableToolbar
                                    variant="inline"
                                    format="MM/dd/yyyy"
                                    margin="normal"
                                    label="Fecha de nacimiento"
                                    value={birthday_date}
                                    onChange={handleChangeBirthday_date}
                                    KeyboardButtonProps={{
                                        'aria-label': 'change date',
                                    }}
                                    required
                                />
                            </MuiPickersUtilsProvider>
                        </Grid>
                        <Grid item md={12} lg={7}>
                            <FormControl error={ errors.email ? true : false } fullWidth className={classes.margin} variant="outlined">
                                <InputLabel htmlFor="email-input">Correo electrónico</InputLabel>
                                <Input
                                    id="email-input"
                                    aria-describedby="email-helper-text"
                                    type="email"
                                    value={email}
                                    onChange={handleChangeEmail}
                                    required
                                />
                                { 
                                    errors.email 
                                        ? <FormHelperText id="email-helper-text">{errors.email}</FormHelperText>
                                        : null
                                }
                            </FormControl>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </Fragment>
    );
}