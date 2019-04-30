import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

class CustomCheckbox extends Component {
  changeHandlerForCheckbox = () => {
    const { checkboxState, changeMode, mode } = this.props;
    if (checkboxState) {
      changeMode('');
    } else {
      changeMode(mode);
    }
  }

  render() {
    const { checkboxState, titleCheckbox } = this.props;

    return (
      <div className="CheckboxWrapper">
        <p>{titleCheckbox}</p>
        <label className="Switch">
          <input type="checkbox" onChange={this.changeHandlerForCheckbox} checked={checkboxState} />
          <span className="Slider"></span>
        </label>
      </div>
    );
  }
}

CustomCheckbox.propTypes = {
  changeMode: PropTypes.func,
  checkboxState: PropTypes.bool,
  titleCheckbox: PropTypes.string,
  mode: PropTypes.string,
};

CustomCheckbox.defaultProps = {
  changeMode: null,
  checkboxState: false,
  titleCheckbox: '',
  mode: '',
};

export default CustomCheckbox;
