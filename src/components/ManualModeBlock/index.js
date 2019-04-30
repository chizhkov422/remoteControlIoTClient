import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import CustomCheckbox from '../CustomCheckbox';

class ManualModeBlock extends Component {
  state = {
    temperature: 0,
  }
  componentDidMount() {
    this.setState({ temperature: this.props.temperature });
  }
  clickHandlerForSaveButton = () => {
    const inputValues = {
      temperature: this.state.temperature,
    }

    this.props.saveMode('manual', inputValues);
  }
  changeHandlerForInput = (e) => {
    this.setState({ temperature: e.target.value });
  }
  render() {
    const { changeMode, currentMode } = this.props;

    return (
      <div className="ManualModeBlock">
        <CustomCheckbox
          changeMode={changeMode}
          checkboxState={currentMode === 'manual'}
          titleCheckbox='Manual mode'
          mode='manual'
        />

        <div className={currentMode === 'manual' ? 'MainBlock' : 'HideBlock'}>
          <label>
            <p className="LabelInput">Temperature</p>
            <input
              type='number'
              onChange={this.changeHandlerForInput}
              value={this.state.temperature}
            />
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

ManualModeBlock.propTypes = {
  changeMode: PropTypes.func,
  currentMode: PropTypes.string,
};

ManualModeBlock.defaultProps = {
  changeMode: null,
  currentMode: '',
};

export default ManualModeBlock;
