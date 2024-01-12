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

  componentDidMount() {
    let apiPath = "http://127.0.0.1:5000/" + this.props.route;
    Axios.get(apiPath, { 
      responseType: "text",
      withCredentials: true
    }).then(response => 
    {
      this.setState({
        options: response.data.split(","),
      });
    });
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