const Info = ({ todo, done }) => {
  return (
    <div className='text-right text-secondary m-2'>
      {todo} more to do, {done} done
    </div>
  );
};

export default Info;
