import React, { Component } from 'react';
import axios from 'axios';
import Checkbox from '../../components/Checkbox'

class CheckboxCont extends Component {
  state = {
    checkboxState: false,
  }
  componentDidMount() {
    axios.get('https://remote-control-iot-server.herokuapp.com/api/states/getState/checkbox')
      .then(response => {
        this.setState({ checkboxState: Boolean(response.data.data.stateValue) });
      });
  }
  changeCheckboxState = (e) => {
    const data = JSON.stringify({
      stateName: 'checkbox',
      stateValue: e.target.checked ? 1 : 0
    });

    axios.post('https://remote-control-iot-server.herokuapp.com/api/states/update', {
      state: data
    });

    this.setState({ checkboxState: e.target.checked });
  }
  render() {
    return (
      <>
        <Checkbox changeHandlerForCheckbox={this.changeCheckboxState} chackboxState={this.state.checkboxState} />
      </>
    );
  }
}

export default CheckboxCont;
