import React from 'react';
import { TextField, Fab } from "@material-ui/core";
import PropTypes from 'prop-types';
import './Styles.css'

export default class InputWithButton extends React.Component {

    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            inputText: props.initialText || ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.onFormSubmitted = this.onFormSubmitted.bind(this);
        this.textInput = React.createRef();
    }

    // THIS METHOD IS DEPRECATED!!!
    // componentWillReceiveProps(newProps) {
    //     this.setState({
    //         inputText: newProps.initialText
    //     });
    // }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.initialState !== this.props.initialState) {
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
                {this.props.children}
            </form>
        );
    };
}

InputWithButton.propTypes = {
  label: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
  onDataSubmitted: PropTypes.func.isRequired,
  initialState: PropTypes.string
};