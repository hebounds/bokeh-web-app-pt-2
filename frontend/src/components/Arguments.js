import Dropdown from './Dropdown'
import React, { Component } from 'react';

class Arguments extends Component {

  constructor() {
    super();
    this.state = {
      selectedDataSource: "",
      selectedRecording: "recording1",
      selectedChannel: "Channel1"
    }
  }

  changeDataSource = (newDataSource) => {
    this.setState({selectedDataSource: newDataSource});
    this.props.onChanges[0](newDataSource);
  }

  changeRecording = (newRecording) => {
    this.setState({selectedRecording: newRecording});
    this.props.onChanges[1](newRecording);
  }

  changeChannel = (newChannel) => {
    this.setState({selectedChannel: newChannel});
    this.props.onChanges[2](newChannel);
  }

  render() {
    const { selectedDataSource, selectedRecording } = this.state;
    const { changeDataSource, changeRecording, changeChannel } = this;
    return (
      <div className="flex flex-row justify-left items-left">
        <div className="px-2 text-center">
          <p>Data Source:</p>
          <Dropdown route="dataSources" onChange={changeDataSource} loadCondition={[null, null]} properties="rounded-md text-gunmetal"/>
        </div>
        <div className="px-2 text-center">
          <p>Recording:</p>
          <Dropdown route="recordings" onChange={changeRecording} loadCondition={[selectedDataSource, null]} properties="rounded-md text-gunmetal"/>
        </div>
        <div className="px-2 text-center">
          <p>Channel:</p>
          <Dropdown route="channels" onChange={changeChannel} loadCondition={[selectedDataSource, selectedRecording]} properties="rounded-md text-gunmetal"/>
        </div>
      </div>
    );
  }
}

export default Arguments;