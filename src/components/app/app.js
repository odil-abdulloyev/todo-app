import { Component } from 'react';
import ControlPanel from '../control-panel/control-panel';
import Heading from '../heading/heading';
import Info from '../info/info';
import ItemAddForm from '../item-add-form/item-add-form';
import TodoList from '../todo-list/todo-list';

export default class App extends Component {
  maxId = 100;

  search = (items, term) => {
    return items.filter((item) => item.label.toLowerCase().indexOf(term) > -1);
  };

  filterByStatus = (items, status) => {
    switch (status) {
      case 'active':
        return items.filter((item) => !item.done);
      case 'done':
        return items.filter((item) => item.done);
      default:
        return items;
    }
  };

  saveToLocalStorage = (data) => {
    localStorage.setItem('todoData', JSON.stringify(data));
  };

  state = {
    todoData: [],
    term: '',
    filterType: 'all',
  };

  componentDidMount() {
    this.setState({
      todoData: JSON.parse(localStorage.getItem('todoData') || '[]'),
    });
  }

  deleteItem = (id) => {
    const newData = this.state.todoData.filter((item) => item.id !== id);
    this.setState(() => ({ todoData: newData }));
    this.saveToLocalStorage(newData);
  };

  addItem = (label) => {
    const newData = [
      ...this.state.todoData,
      {
        id: this.maxId++,
        label,
        important: false,
        done: false,
      },
    ];
    this.setState(() => ({ todoData: newData }));
    this.saveToLocalStorage(newData);
  };

  toggleProperty = (id, property) => {
    const newData = this.state.todoData.map((item) =>
      item.id === id ? { ...item, [property]: !item[property] } : item
    );
    this.setState(() => ({ todoData: newData }));
    this.saveToLocalStorage(newData);
  };

  toggleImportant = (id) => {
    this.toggleProperty(id, 'important');
  };

  toggleDone = (id) => {
    this.toggleProperty(id, 'done');
  };

  handleSearch = (term) => {
    this.setState({ term });
  };

  applyFilter = (filterType) => {
    this.setState({ filterType });
  };

  render() {
    const { todoData, term, filterType } = this.state;
    const doneCount = todoData.filter((item) => item.done).length;
    const todoCount = todoData.length - doneCount;
    const visibleItems = this.filterByStatus(this.search(todoData, term), filterType);

    return (
      <div className='pt-5 pb-3'>
        <div className='container'>
          <Heading />
          <Info todo={todoCount} done={doneCount} />
          <ControlPanel onSearch={this.handleSearch} onFilterApply={this.applyFilter} />
          <TodoList
            onDeleted={this.deleteItem}
            onToggleDone={this.toggleDone}
            onToggleImportant={this.toggleImportant}
            todos={visibleItems}
          />
          <ItemAddForm onItemAdded={this.addItem} />
        </div>
      </div>
    );
  }
}
