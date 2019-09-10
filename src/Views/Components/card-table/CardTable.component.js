import React from 'react';
import PropTypes from 'prop-types';
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

CardTable.propTypes = {
  header: PropTypes.element.isRequired,
  body: PropTypes.element.isRequired
};
