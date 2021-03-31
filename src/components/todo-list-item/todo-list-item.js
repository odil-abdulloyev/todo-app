import './todo-list-item.scss';

const TodoListItem = ({ label, onDeleted, onToggleDone, onToggleImportant, done, important }) => {
  let classes = 'todo-list-item-label';
  if (done) {
    classes += ' done';
  }
  if (important) {
    classes += ' important';
  }
  return (
    <span className='todo-list-item'>
      <span className={classes} onClick={onToggleDone}>
        {label}
      </span>
      <span className='item-control'>
        <button onClick={onDeleted} type='button' className='btn btn-outline-danger btn-control'>
          <i className='far fa-trash-alt'></i>
        </button>
        <button
          onClick={onToggleImportant}
          type='button'
          className='btn btn-outline-success btn-control'
        >
          <i className='fas fa-exclamation'></i>
        </button>
      </span>
    </span>
  );
};

export default TodoListItem;
