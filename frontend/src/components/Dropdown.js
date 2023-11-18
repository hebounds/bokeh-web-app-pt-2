import React, { Component } from 'react';

class Dropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOption: props.options[0], // Set the default selected option
      properties: props.properties
    };

    this.handleSelectChange = this.handleSelectChange.bind(this);
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
    const { options } = this.props;
    const { selectedOption, properties } = this.state;

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