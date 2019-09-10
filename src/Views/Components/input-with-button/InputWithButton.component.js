import React from 'react';
import { TextField, Fab } from "@material-ui/core";
import './Styles.css'

export default class InputWithButton extends React.Component {

    constructor(props) {
        super();
        console.log(props);
        this.state = {
            inputText: props.initialText || ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.onFormSubmitted = this.onFormSubmitted.bind(this);
        this.textInput = React.createRef();
    }

    // componentWillReceiveProps(newProps) {
    //     this.setState({
    //         inputText: newProps.initialText
    //     });
    // }

    componentDidUpdate(prevProps, prevState) {
        if (JSON.stringify(prevProps) !== JSON.stringify(this.props)) {
            this.setState({
                inputText: this.props.initialText
            });
        }
    }

    handleChange(event) {
        this.setState({
            inputText : event.target.value
        });
    }

    onFormSubmitted(event) {
        event.preventDefault();
        this.setState({
            inputText: ""
        });
        this.props.onDataSubmitted(this, this.state.inputText);
    }

    focusInput() {
        console.log("Focus called");
        this.textInput.current.focus();
    }

    render(){
        return (
            <form className="Card" onSubmit={this.onFormSubmitted}>
                <TextField required id="text" label={this.props.label} onChange={this.handleChange} value={this.state.inputText} inputRef={this.textInput}/>
                <Fab type="submit" variant="extended">{this.props.buttonText}</Fab>
            </form>
        );
    };
}