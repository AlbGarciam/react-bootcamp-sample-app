import React from 'react';
import { getCurrentUser, getTodoItems, saveTodoItems, clearSession } from '../../../Storage/SessionStorage.constants';
import InputWithButton from '../../Components/input-with-button/InputWithButton.component';
import CardTable from '../../Components/card-table/CardTable.component';
import { Fab } from '@material-ui/core';

import './Styles.css';
import Todo from './Todo.model';

export default class TodosScene extends React.Component {

    constructor() {
        super();
        this.state = {
            currentUser: getCurrentUser(),
            todoList: getTodoItems() || [],
            lastIncludedText: "",
            editingPosition: null,
            isReplacing: false
        };
        this.onInputSubmitted = this.onInputSubmitted.bind(this);
        this.onDisconnect = this.onDisconnect.bind(this);
        this.inputWithButton = React.createRef();
    }

    componentDidMount() {
        if (!this.state.currentUser) {
            this.props.history.replace('/sign-in');
        }
    }

    onInputSubmitted(_, data) {
        if (!data) { return; }
        this.state.isReplacing ? this.handleReplace(data) : this.handleNormalInput(data)
    }

    handleReplace(data){
        var newTodoList = this.state.todoList;
        var position = this.state.editingPosition;
        newTodoList[position].value = data

        this.setState({
            todoList: newTodoList,
            isReplacing: false,
            editingPosition: null
        });

        saveTodoItems(newTodoList)
    }

    handleNormalInput(data) {
        if (this.state.todoList.includes(data)) { return; }

        var newTodoList = this.state.todoList;
        newTodoList.push(new Todo(this.state.todoList.length, data));

        this.setState({
            todoList: newTodoList
        });

        saveTodoItems(newTodoList);
    }

    onDisconnect() {
        clearSession()
        this.props.history.goBack()
    }

    onDeleteRequested(event, item) {
        var newTodoList = this.state.todoList;
        newTodoList.splice(item.position, 1);
        this.setState({
            todoList: newTodoList
        });
    }

    onEditRequested(_, item) {
        console.log("OnEditRequested");
        this.setState({
            isReplacing: true,
            editingPosition: item.position,
            lastIncludedText: item.value
        });
        this.inputWithButton.current.focusInput();
    }

    headerHTML() {
        return <tr><th>Tarea</th><th>Acciones</th></tr>
    }

    rowsForTodo(items) {
        return items.map( item => {
            return <tr key={`${item.position}-${item.value}`}><td>{item.value}</td><td><Fab variant="extended" onClick={(event) => {this.onDeleteRequested(event, item)}}>Borrar</Fab></td><td><Fab variant="extended" onClick={(event) => {this.onEditRequested(event, item)}}>Edit</Fab></td></tr>;
        });
    }

    render() {
        const rows = this.rowsForTodo(this.state.todoList);
        var Username = "";
        if (this.state.currentUser) {
            Username = this.state.currentUser.name
        }
        console.log("Rendering");
        return (
            <div className="Container">
                <p>Hola {Username}</p>
                <InputWithButton label="Tarea" onDataSubmitted={this.onInputSubmitted}  
                                 initialText={ this.state.isReplacing ? this.state.lastIncludedText : "" } 
                                 ref={this.inputWithButton}
                                 buttonText={this.state.isReplacing ? "Guardar" : "Añadir"}
                                />
                <CardTable header={this.headerHTML()} body={rows}/>
                <Fab variant="extended" onClick={this.onDisconnect}>Desconectar</Fab>
            </div>
        );
    };
}