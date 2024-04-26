import React, { Component } from 'react';

import minus_icon from '../images/minus.svg';

class MinusArgs extends Component {
  handleRemoveComponent = () => {
    this.props.remove(this.props.linkedId);
  };

  render() {

    return (
      <div>
        <button className="p-4 rounded-full bg-blue-500 hover:bg-blue-400 border-b-4 border-blue-700 hover:border-blue-500" onClick={this.handleRemoveComponent}>
          <img className="invert" src={minus_icon} alt="Minus" width='10' height='10'></img>
        </button>
      </div>
    );
  }
}

export default MinusArgs