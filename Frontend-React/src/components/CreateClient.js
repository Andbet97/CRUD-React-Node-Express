import React, { Fragment, useState } from 'react';
import { useHistory } from "react-router-dom";
import '../css/CreateClient.css';
import {
    Button, Divider
} from '@material-ui/core';
import { Form } from './Form';
import axios from 'axios';


export const CreateClient = () => {

    const [name, setName] = useState('');
    const [dni, setDni] = useState('');
    const [birthday_date, setBirthday_date] = useState(new Date());
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});

    let history = useHistory();

    const handleCancel = () => {
        history.push("/client/list");
    }

    const handleSave = (e) => {
        e.preventDefault();
        let URL = process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : 'http://localhost:5000/api';
        URL += '/clients';
        axios
            .post(URL, {
                name: name,
                dni: dni,
                email: email,
                birthday_date: birthday_date
            })
            .then(() => {
                handleCancel();
            }).catch((err) => {
                if (err.response.status === 400) {
                    setErrors(err.response.data.errors);
                } else {
                    console.log(err);
                }
            });
    }

    return (
        <Fragment>
            <div className="row">
                <div className="col-12">
                    <h1>Nuevo Cliente</h1>
                </div>
            </div>
            <div className="row">
                <div className="col-12 content-box">
                    <div className="row">
                        <form className="col-10 offset-1 mt-5">
                            <Form 
                                states={{name, dni, birthday_date, email, errors}}
                                setStates={{setName, setDni, setBirthday_date, setEmail}}
                            />
                            <Divider variant="fullWidth" id="divider"/>
                            <div className="row mb-5">
                                <div id="buttons-box" className="col-3 offset-9 mt-4">
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        onClick={handleCancel}
                                    >
                                        Cancelar
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                        className="blue-color"
                                        onClick={handleSave}
                                    >
                                        Guardar
                                    </Button>
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </Fragment>
    );
}
