import React, { Component } from 'react';

import minus_icon from '../images/minus.svg';

class Minus extends Component {
  handleRemoveComponent = () => {
    this.props.remove(this.props.linkedId);
  };

  render() {

    return (
      <div>
        <button className="p-4 rounded-full bg-battle-grey1 hover:bg-battle-grey2" onClick={this.handleRemoveComponent}>
          <img className="invert" src={minus_icon} alt="Minus" width='20' height='20'></img>
        </button>
      </div>
    );
  }
}

export default Minus