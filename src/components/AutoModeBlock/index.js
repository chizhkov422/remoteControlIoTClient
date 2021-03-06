import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import CustomCheckbox from '../CustomCheckbox';

class AutoModeBlock extends Component {
  state = {
    minTemp: this.props.minTemp,
    maxTemp: this.props.maxTemp,
    changedFields: false,
  }
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        minTemp: nextProps.minTemp
      });
      this.setState({
        maxTemp: nextProps.maxTemp
      });
    }
  }
  clickHandlerForSaveButton = () => {
    const inputValues = {
      minTemp: this.state.minTemp,
      maxTemp: this.state.maxTemp,
    }

    this.props.saveMode('auto', inputValues);

    this.setState({ changedFields: false });
  }
  changeHandlerForMinTemp = async (e) => {
    await this.setState({ minTemp: parseInt(e.target.value, 10) });

    if (this.state.minTemp !== this.props.minTemp) {
      this.setState({ changedFields: true });
    } else {
      this.setState({ changedFields: false });
    }
  }
  changeHandlerForMaxTemp = async (e) => {
    await this.setState({ maxTemp: parseInt(e.target.value, 10) });

    if (this.state.maxTemp !== this.props.maxTemp) {
      this.setState({ changedFields: true });
    } else {
      this.setState({ changedFields: false });
    }
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
            className={this.state.changedFields ? 'SaveButton' : 'SaveButton_Hide'}
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
  minTemp: PropTypes.number,
  maxTemp: PropTypes.number,
};

AutoModeBlock.defaultProps = {
  changeMode: null,
  currentMode: '',
  saveMode: null,
  minTemp: 10,
  maxTemp: 10,
};

export default AutoModeBlock;
