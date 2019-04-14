import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';

class Checkbox extends Component {
  render() {
    const { changeHandlerForCheckbox, chackboxState } = this.props;

    return (
      <div className="Wrapper">
        <p>Check state</p>
        <label className="Switch">
          <input type="checkbox" onChange={changeHandlerForCheckbox} checked={chackboxState} />
          <span className="Slider"></span>
        </label>
      </div>
    );
  }
}

Checkbox.propTypes = {
  changeHandlerForCheckbox: PropTypes.func,
  chackboxState: PropTypes.bool,
};

Checkbox.defaultProps = {
  changeHandlerForCheckbox: null,
  chackboxState: false,
};

export default Checkbox;
