import { Component } from 'react';

export default class ItemAddForm extends Component {
  state = {
    label: '',
  };

  handleChange = (event) => {
    this.setState({ label: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.onItemAdded(this.state.label);
    this.setState({ label: '' });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit} className='item-add-form d-flex mt-3'>
        <input
          onChange={this.handleChange}
          placeholder='What needs to be done'
          type='text'
          className='form-control mr-2'
          value={this.state.label}
          required
        />
        <button className='btn btn-outline-secondary' style={{ whiteSpace: 'nowrap' }}>
          Add item
        </button>
      </form>
    );
  }
}
