import React from 'react';
import './Styles.css'


export default class CardTable extends React.Component {
    render() {
        return (
            <table className="TableCard" >
                <thead>
                    {this.props.header}
                </thead>
                <tbody>
                    {this.props.body}
                </tbody>
            </table>
        );
    };
}