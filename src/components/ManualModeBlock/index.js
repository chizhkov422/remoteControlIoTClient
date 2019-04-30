import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import CustomCheckbox from '../CustomCheckbox';

class ManualModeBlock extends Component {
  state = {
    manualTemp: 10,
  }
  componentDidMount() {
    this.setState({ manualTemp: this.props.manualTemp });
  }
  clickHandlerForSaveButton = () => {
    const inputValues = {
      manualTemp: this.state.manualTemp,
    }

    this.props.saveMode('manual', inputValues);
  }
  changeHandlerForInput = (e) => {
    this.setState({ manualTemp: e.target.value });
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
              value={this.state.manualTemp}
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
  manualTemp: PropTypes.number,
};

ManualModeBlock.defaultProps = {
  changeMode: null,
  currentMode: '',
  manualTemp: 0,
};

export default ManualModeBlock;
