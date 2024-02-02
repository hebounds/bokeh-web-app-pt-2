import React, { Component } from 'react';

import Axios from 'axios';

class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: [],
      selectedOption: "", // Set the default selected option
      properties: props.properties,
    };

    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  makeRequest(dataSource = null) {
    let apiPath = "http://127.0.0.1:5000/" + this.props.route;

    const params = dataSource ? { dataSource: dataSource } : null;

    Axios.get(apiPath, {
      params: params,
      responseType: "text",
      withCredentials: true,
    }).then((response) => {
      const selectedOption = response.data.split(",")[0]
      this.setState({
        options: response.data.split(","),
        selectedOption: selectedOption,
      });
      if (this.props.onChange) {
        this.props.onChange(selectedOption);
      }
    });
  }

  componentDidMount() {
    if (this.props.loadCondition == null) {
      this.makeRequest();
    }
  }

  componentDidUpdate(prevProps) {
    console.log(prevProps.loadCondition);
    console.log(this.props.loadCondition);
    console.log(this.state.selectedOption);
    console.log(this.state.options);
    if (this.props.loadCondition !== null && (prevProps.loadCondition !== this.props.loadCondition)) {
      this.makeRequest(this.props.loadCondition);
    }
  }

  handleSelectChange(event) {
    const selectedOption = event.target.value;
    this.setState({ selectedOption });

    // Call the parent component's onChange callback with the selected option
    if (this.props.onChange) {
      this.props.onChange(selectedOption);
    }
  }

  
  render() {
    const { options, selectedOption, properties } = this.state;
    
    return (
      <div>
        <select
          id="dropdown"
          value={selectedOption}
          onChange={this.handleSelectChange}
          className={properties}
        >
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      
      </div>
    );
  }
}

export default Dropdown;