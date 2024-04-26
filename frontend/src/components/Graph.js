import Minus from './Minus'
import PlusArgs from './PlusArgs'

import React, { Component } from 'react';

import Axios from 'axios';

import err_icon from '../images/error.svg';

class Graph extends Component {

  constructor() {
    super();
    this.state = {
      selectedDataSources: "",
      selectedRecordings: "recording1",
      selectedChannels: "Channel1",
      isError: Array.from([
        {text:"Start and stop time are equal!", error:'false', id:'0'},
        {text:"Invalid date!", error:'false', id:'1'}
      ])
    }
  }

  changeErrors = (newErrors) => {
    this.setState({isError: newErrors})
  }

  handleChangeIsError = (index, newValue) => {
    const updatedList = [...this.state.isError]; 
    updatedList[index].error = newValue;
    this.changeErrors(updatedList);
  };

  changeDataSource = (newDataSource) => {
    this.setState({selectedDataSources: newDataSource});
  }

  changeRecording = (newRecording) => {
    this.setState({selectedRecordings: newRecording});
  }

  changeChannel = (newChannel) => {
    this.setState({selectedChannels: newChannel});
  }
  
  ErrorNotif = () => {
    return (
      <div className="flex flex-col justify-center items-center" id="notif_error">

        {this.state.isError.map(function(errors) {
          return (
            <div key={errors.id} className='py-0.5'>
              {errors.error === 'true' ? <div className="flex flex-row justify-center items-center rounded-xl bg-red-500 p-2 border-b-4 border-red-700">
                <div className='px-1'>
                  <img src={err_icon} alt="Error" width='20' height='20'></img>
                </div>
                <div className='text-base'>
                  {errors.text}
                </div>
              </div> :  <p></p>}
            </div>
          )
        })}

      </div>
    );
  }

  Generate = ({properties}) => {
    const handleClick = async() => {
    const { selectedDataSources, selectedRecordings, selectedChannels } = this.state;
      console.log(selectedDataSources);
      console.log(selectedRecordings);
      console.log(selectedChannels);
      let lowerBound = document.getElementById('lower_bound' + this.props.id);
      let upperBound = document.getElementById('upper_bound' + this.props.id);
      
      let start = lowerBound.value;
      let stop = upperBound.value;

      // Error checking

      let num_errors = 0;
      
      if (start === stop) {
        this.handleChangeIsError(0, 'true');
        num_errors++;
      } else {
        this.handleChangeIsError(0, 'false');
      }

      // Rest of error checking

      // Abort process if error found

      if (num_errors !== 0) {
        return;
      }

      const params = {
        channel: selectedChannels,
        start: start,
        stop: stop,
        dataSource: selectedDataSources,
        recording: selectedRecordings,
      };

      Axios.get("http://127.0.0.1:5000/plot1", { 
        params: params, 
        responseType: 'blob',
        withCredentials: true
      }).then(response => 
      {
        let imageNode = document.getElementById(this.props.id);
        let imgUrl = URL.createObjectURL(response.data);
        imageNode.src = imgUrl;
      });
    }
  
    return <div>
      <button onClick={handleClick} className={properties}>Generate</button>
    </div>
  }

  render() {
    const { Generate, ErrorNotif } = this;
    const { changeDataSource, changeRecording, changeChannel } = this;

    return (
      <div className="flex flex-row">
        <div className="pb-8 pt-4 px-8 mx-auto my-8 bg-battle-grey1 rounded-xl shadow-lg space-y-2">
          <ErrorNotif></ErrorNotif>
          <div className="flex flex-row justify-left items-left">
            <PlusArgs onChanges={[changeDataSource, changeRecording, changeChannel]}></PlusArgs>
            <div className="px-2 text-center">
              <label>Start Time:</label>
              <input type="datetime-local" id={'lower_bound' + this.props.id} className="bg-white border border-white text-black text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-0.5" placeholder="0" required></input>
            </div>
            <div className="px-2 text-center">
              <label>Stop Time:</label>
              <input type="datetime-local" id={'upper_bound' + this.props.id} className="bg-white border border-white text-black text-sm rounded-md focus:ring-blue-500 focus:border-blue-500 block p-0.5" placeholder="0" required></input>
            </div>
            <div className="flex-grow"></div>
            <div className="px-2 text-center">
              <Generate properties="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"></Generate>
            </div>
          </div>
          <div className="py-3 px-3 max-x-2xl my-1 bg-white rounded-xl shadow-lg space-y-2">
            <img id={this.props.id} alt=""></img>
          </div>
        </div>
        <div className="pt-4 px-4 mx-auto ">
          <Minus linkedId={this.props.id} remove={this.props.remove}></Minus>
        </div>
      </div>
    );
  }
}

export default Graph;