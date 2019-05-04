import React, { Component } from 'react';
import AutoModeBlock from '../components/AutoModeBlock';
import ManualModeBlock from '../components/ManualModeBlock';
import io from 'socket.io-client';

const connectUrl = 'https://remote-control-iot-server.herokuapp.com/';
const socket = io.connect(connectUrl, { reconnect: true });

class App extends Component {
  state = {
    currentMode: 'auto',
    manualTemp: 0,
    minTemp: 0,
    maxTemp: 0,
    currentTemperature: 0,
  }
  componentDidMount() {

    socket.on('connect', () => {
      console.log('Connected to socket chanel!');
    });

    socket.on('temperatureStateClient', (state) => {
      if (state.initialState) {
        this.setState({ currentMode: state.data.mode ? state.data.mode : '' });
        this.setState({ manualTemp: state.data.manualTemp ? state.data.manualTemp : 0 });
        this.setState({ minTemp: state.data.minTemp ? state.data.minTemp : 0 });
        this.setState({ maxTemp: state.data.maxTemp ? state.data.maxTemp : 0 });
      }
    });

    socket.on('currentTemperatureForClient', (currentTemperature) => {
      this.setState({ currentTemperature: currentTemperature ? currentTemperature : 0 });
    });
  }
  changeMode = (mode) => {
    this.setState({ currentMode: mode });
  }
  saveMode = (mode, inputValue) => {
    let data;

    switch (mode) {
      case 'auto': {
        data = {
          stateName: 'temperature',
          mode: mode,
          minTemp: parseInt(inputValue.minTemp, 10),
          maxTemp: parseInt(inputValue.maxTemp, 10),
          webClient: true,
        };
        this.setState({
          mode: mode,
          minTemp: parseInt(inputValue.minTemp, 10),
          maxTemp: parseInt(inputValue.maxTemp, 10),
        });
        break;
      }
      case 'manual': {
        data = {
          stateName: 'temperature',
          mode: mode,
          manualTemp: parseInt(inputValue.manualTemp, 10),
          webClient: true,
        };
        this.setState({
          mode: mode,
          manualTemp: parseInt(inputValue.manualTemp, 10),
        });
        break;
      }
      default: {
        console.error('Undefined mode');
      }
    }

    if (data) {
      socket.emit('updateTemperatureState', data);
      alert('State saved!');
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
