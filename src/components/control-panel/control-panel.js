import { Component } from 'react';

export default class ControlPanel extends Component {
  state = {
    term: '',
    activeButton: 'all',
  };

  classes = {
    all: 'btn btn-info',
    active: 'btn btn-outline-secondary',
    done: 'btn btn-outline-secondary',
  };

  handleChange = (event) => {
    const term = event.target.value;
    this.setState({ term });
    this.props.onSearch(term);
  };

  handleClick = (activeButton) => {
    this.setState({ activeButton });
    this.props.onFilterApply(activeButton);
    Object.keys(this.classes).forEach((key) => {
      this.classes[key] = 'btn btn-outline-secondary';
    });
    this.classes[activeButton] = 'btn btn-info';
  };

  render() {
    return (
      <div className='d-flex mb-3'>
        <input
          onChange={this.handleChange}
          className='form-control mr-3'
          type='text'
          placeholder='Search'
          value={this.state.term}
        />
        <div className='btn-group' role='group'>
          <button
            onClick={() => this.handleClick('all')}
            type='button'
            className={this.classes.all}
          >
            All
          </button>
          <button
            onClick={() => this.handleClick('active')}
            type='button'
            className={this.classes.active}
          >
            Active
          </button>
          <button
            onClick={() => this.handleClick('done')}
            type='button'
            className={this.classes.done}
          >
            Done
          </button>
        </div>
      </div>
    );
  }
}
