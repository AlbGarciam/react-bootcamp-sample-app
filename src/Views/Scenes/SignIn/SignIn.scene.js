import React from "react";
import { TextField, Fab } from "@material-ui/core";
import {saveCurrentUser, getCurrentUser} from "../../../Storage/SessionStorage.constants";
import store from '../../../redux/store/store';
import {saveUser} from '../../../redux/actions/userActions';

import './SignIn.css'

export default class SignInScene extends React.Component {
    constructor() {
        super();
        this.state = {
            name: "",
            surname: "",
            age: 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.onFormSubmitted = this.onFormSubmitted.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    componentDidMount() {
        if (getCurrentUser()) {
            this.props.history.push('/todos');
        }
    }

    onFormSubmitted(event) {
        event.preventDefault();
        if (this.validateSignInInput(this.state.name, this.state.surname, this.state.age)) {
            saveCurrentUser(this.state);
            this.props.history.push('/todos');
        } else {
            alert("Comprueba que los datos introducidos son correctos");
        }
    }

    validateSignInInput(name, surname, age) {
        if (!(name && surname && age )) { return false; }
        return name.length > 5 && surname.length > 5 && age > 18;
    };

    render() {
        return (
            <form className="Login" onSubmit={this.onFormSubmitted}>
                <TextField required id="name" label="Nombre" onChange={this.handleChange} value={this.state.name} />
                <TextField required id="surname" label="Apellido" onChange={this.handleChange} value={this.state.surname} />
                <TextField required id="age" label="Edad" onChange={this.handleChange} value={this.state.age} />
                <Fab type="submit" variant="extended" onClick={this.onFormSubmitted}>Entrar</Fab>
            </form>
        );
    };
}