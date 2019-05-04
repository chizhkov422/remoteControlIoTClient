import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import CustomCheckbox from '../CustomCheckbox';

class ManualModeBlock extends Component {
  state = {
    manualTemp: this.props.manualTemp,
    changedFields: false
  }
  componentWillReceiveProps(nextProps) {
    if (this.props !== nextProps) {
      this.setState({
        manualTemp: nextProps.manualTemp
      });
    }
  }
  clickHandlerForSaveButton = () => {
    const inputValues = {
      manualTemp: this.state.manualTemp,
    }

    this.props.saveMode('manual', inputValues);

    this.setState({ changedFields: false });
  }
  changeHandlerForInput = async (e) => {
    await this.setState({ manualTemp: parseInt(e.target.value, 10) });

    if (this.state.manualTemp !== this.props.manualTemp) {
      this.setState({ changedFields: true });
    } else {
      this.setState({ changedFields: false });
    }
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
