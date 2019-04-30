import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import CustomCheckbox from '../CustomCheckbox';

class AutoModeBlock extends Component {
  state = {
    minTemp: 0,
    maxTemp: 0,
  }
  componentDidMount() {
    this.setState({ minTemp: this.props.minTemp });
    this.setState({ maxTemp: this.props.maxTemp });
  }
  clickHandlerForSaveButton = () => {
    const inputValues = {
      minTemp: this.state.minTemp,
      maxTemp: this.state.maxTemp,
    }

    this.props.saveMode('auto', inputValues);
  }
  changeHandlerForMinTemp = (e) => {
    this.setState({ minTemp: e.target.value });
  }
  changeHandlerForMaxTemp = (e) => {
    this.setState({ maxTemp: e.target.value });
  }
  render() {
    const { changeMode, currentMode } = this.props;

    return (
      <div className="AutoModeBlock">
        <CustomCheckbox
          changeMode={changeMode}
          checkboxState={currentMode === 'auto'}
          titleCheckbox='Auto mode'
          mode='auto'
        />

        <div className={currentMode === 'auto' ? 'MainBlock' : 'HideBlock'}>
          <label>
            <p className="LabelInput">Min temperature</p>
            <input type='number' value={this.state.minTemp} onChange={this.changeHandlerForMinTemp} />
          </label>
          <label>
            <p className="LabelInput">Max temperature</p>
            <input type='number' value={this.state.maxTemp} onChange={this.changeHandlerForMaxTemp} />
          </label>
          <button
            className="SaveButton"
            onClick={this.clickHandlerForSaveButton}
          >
            Save
          </button>
        </div>
      </div >
    );
  }
}

AutoModeBlock.propTypes = {
  changeMode: PropTypes.func,
  currentMode: PropTypes.string,
  saveMode: PropTypes.func,
};

AutoModeBlock.defaultProps = {
  changeMode: null,
  currentMode: '',
  saveMode: null,
};

export default AutoModeBlock;
