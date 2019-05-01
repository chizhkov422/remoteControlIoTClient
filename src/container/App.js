import React, { Component } from 'react';
import axios from 'axios';
import AutoModeBlock from '../components/AutoModeBlock';
import ManualModeBlock from '../components/ManualModeBlock';

class App extends Component {
  state = {
    currentMode: 'auto',
    manualTemp: 0,
    minTemp: 0,
    maxTemp: 0,
  }
  componentDidMount() {
    axios.get('https://remote-control-iot-server.herokuapp.com/api/states/getState/temperature', { crossDomain: true })
      .then(response => {
        this.setState({ currentMode: response.data.data.mode });
        this.setState({ manualTemp: response.data.data.manualTemp });
        this.setState({ minTemp: response.data.data.minTemp });
        this.setState({ maxTemp: response.data.data.maxTemp });
      });
  }
  changeMode = (mode) => {
    this.setState({ currentMode: mode });
  }
  saveMode = (mode, inputValue) => {
    let data;

    switch (mode) {
      case 'auto': {
        data = JSON.stringify({
          stateName: 'temperature',
          mode: mode,
          minTemp: parseInt(inputValue.minTemp, 10),
          maxTemp: parseInt(inputValue.maxTemp, 10),
        });
        break;
      }
      case 'manual': {
        data = JSON.stringify({
          stateName: 'temperature',
          mode: mode,
          manualTemp: parseInt(inputValue.manualTemp, 10)
        });
        break;
      }
      default: {
        console.error('Undefined mode');
      }
    }

    if (data) {
      axios.post('https://remote-control-iot-server.herokuapp.com/api/states/update', {
        state: data
      });
    }
  }
  render() {
    return (
      <>
        <AutoModeBlock
          changeMode={this.changeMode}
          currentMode={this.state.currentMode}
          saveMode={this.saveMode}
          minTemp={this.state.minTemp}
          maxTemp={this.state.maxTemp}
        />
        <ManualModeBlock
          changeMode={this.changeMode}
          currentMode={this.state.currentMode}
          saveMode={this.saveMode}
          manualTemp={this.state.manualTemp}
        />
      </>
    );
  }
}

export default App;
