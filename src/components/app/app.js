import { Component } from 'react';
import ControlPanel from '../control-panel/control-panel';
import Heading from '../heading/heading';
import Info from '../info/info';
import ItemAddForm from '../item-add-form/item-add-form';
import TodoList from '../todo-list/todo-list';

export default class App extends Component {
  maxId = 100;

  createTodoItem(label) {
    return {
      id: this.maxId++,
      label,
      important: false,
      done: false,
    };
  }

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

  state = {
    todoData: [
      this.createTodoItem('Drink coffee'),
      this.createTodoItem('Learn React'),
      this.createTodoItem('Have a lunch'),
    ],
    term: '',
    filterType: 'all',
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => ({ todoData: todoData.filter((item) => item.id !== id) }));
  };

  addItem = (label) => {
    const newItem = this.createTodoItem(label);
    this.setState(({ todoData }) => ({
      todoData: [...todoData, newItem],
    }));
  };

  toggleProperty = (id, property) => {
    this.setState(({ todoData }) => ({
      todoData: todoData.map((item) =>
        item.id === id ? { ...item, [property]: !item[property] } : item
      ),
    }));
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
