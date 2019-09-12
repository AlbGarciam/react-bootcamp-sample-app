import React from 'react';
import { getCurrentUser, getTodoItems, saveTodoItems, clearSession } from '../../../Storage/SessionStorage.constants';
import InputWithButton from '../../Components/input-with-button/InputWithButton.component';
import CardTable from '../../Components/card-table/CardTable.component';
import { Fab } from '@material-ui/core';
import store from '../../../redux/store/store';

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
        this.onCancelRequested = this.onCancelRequested.bind(this);
        this.unsubscribe = store.subscribe(() => {
            this.setState({
              currentUser: getCurrentUser(),
              todoList: getTodoItems()
            });
        });
    }

    componentDidMount() {
        if (!getCurrentUser()) {
            this.props.history.replace('/sign-in');
        }
    }

    onInputSubmitted(_, data) {
        if (!data) { return; }
        this.state.isReplacing ? this.handleReplace(data) : this.handleNormalInput(data)
    }

    handleReplace(data){
        var newTodoList = getTodoItems();
        var position = this.state.editingPosition;
        newTodoList[position].value = data;

        this.setState({
            isReplacing: false,
            editingPosition: null
        });

        saveTodoItems(newTodoList)
    }

    handleNormalInput(data) {
        if (this.state.todoList.filter(item => item.value === data).length > 0) { return; }

        var newTodoList = getTodoItems() || [];
        newTodoList.push(new Todo(newTodoList.length, data));

        saveTodoItems(newTodoList);
    }

    onDisconnect() {
        clearSession()
        this.props.history.goBack()
    }

    onDeleteRequested(event, item) {
        var response = confirm("¿Estás seguro de que quieres borrar la entrada?");
        let position = (getTodoItems() || []).indexOf(item);
        if (position === null) { return ; }
        if (response == true) {
            var newTodoList = this.state.todoList;
            newTodoList.splice(position, 1);
            saveTodoItems(newTodoList);
        }
    }

    onEditRequested(_, item) {
      let position = (getTodoItems() || []).indexOf(item);
      if (position === null) { return ; }
        this.setState({
            isReplacing: true,
            editingPosition: item.position,
            lastIncludedText: item.value
        });
        this.inputWithButton.current.focusInput();
    }

    onCancelRequested(event) {
      this.setState({
            isReplacing: false,
            editingPosition: null
      });
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
        console.log(this.state);
        const rows = this.rowsForTodo(this.state.todoList);
        var Username = "";
        if (this.state.currentUser) {
            Username = this.state.currentUser.name
        }
        return (
            <div className="Container">
                <p>Hola {Username}</p>
                <InputWithButton label="Tarea" onDataSubmitted={this.onInputSubmitted}  
                                 initialText={ this.state.isReplacing ? this.state.lastIncludedText : "" } 
                                 ref={this.inputWithButton}
                                 buttonText={this.state.isReplacing ? "Guardar" : "Añadir"}>
                  { this.state.isReplacing && <Fab variant="extended" onClick={this.onCancelRequested}>Cancelar</Fab>}
                </InputWithButton>
                <CardTable header={this.headerHTML()} body={rows}/>
                <Fab variant="extended" onClick={this.onDisconnect}>Desconectar</Fab>
            </div>
        );
    };
}