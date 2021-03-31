import TodoListItem from '../todo-list-item/todo-list-item';

const TodoList = ({ todos, onDeleted, onToggleDone, onToggleImportant }) => {
  return (
    <ul className='list-group todo-list'>
      {todos.map(({ id, label, important, done }) => (
        <li className='list-group-item' key={id}>
          <TodoListItem
            label={label}
            important={important}
            done={done}
            onDeleted={() => onDeleted(id)}
            onToggleDone={() => onToggleDone(id)}
            onToggleImportant={() => onToggleImportant(id)}
          />
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
