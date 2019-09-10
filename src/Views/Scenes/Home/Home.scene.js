import React from "react";
import logo from '../../../logo.svg';  //'./logo.svg';
import { Fab } from "@material-ui/core"

export default class HomeScene extends React.Component {
  constructor() {
    super();
    this.onNextClicked = this.onNextClicked.bind(this);
  }

  onNextClicked() {
    this.props.history.push('sign-in');
  }

  render() {
    return (
      <div>
        <img src={logo} className="App-logo" alt="logo" />
        <p>Pulsa "Siguiente" para continuar</p>
        <Fab variant="extended" onClick={this.onNextClicked}>Siguiente</Fab>
      </div>
    );
  }
}