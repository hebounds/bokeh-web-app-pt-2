import React, { Component } from 'react';

import plus_icon from '../images/plus.svg';

import Arguments from './Arguments.js'

class PlusArgs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      components: [],
      nextId: 0
    };
  }

  handleAddComponent = () => {
    const { components, nextId } = this.state;
    const newComponent = <Arguments key={nextId} 
                                    id={nextId} 
                                    remove={this.handleRemoveComponent} 
                                    onChanges={[this.props.changeDataSource, 
                                                this.props.changeRecording, 
                                                this.props.changeChannel]}/>;
    const newId = nextId + 1;
    this.setState({
      components: [...components, newComponent],
      nextId: newId
    });
  };

  handleRemoveComponent = (removeId) => {
    let { components } = this.state;

    // Find proper index to remove
    let removeIndex = 0;
    let component;
    for (component of components) {
      if (component.props.id === removeId) {
        break;
      }
      removeIndex++;
    }
    
    // Remove component at removeIndex from components
    components.splice(removeIndex, 1);

    this.setState({
      components: components
    });
  }

  render() {
    const { components } = this.state;

    return (
      <div>
        <div>
          {components}
        </div>
        <button className="p-4 rounded-full bg-battle-grey1 hover:bg-battle-grey2" onClick={this.handleAddComponent}>
          <img className="invert" src={plus_icon} alt="Plus" width='20' height='20'></img>
        </button>
      </div>
    );
  }
}

export default Plus