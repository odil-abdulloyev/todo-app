const FilterButton = ({ text, active = false }) => {
  let classes = 'btn';
  if (active) {
    classes += ' btn-info';
  } else {
    classes += ' btn-outline-secondary';
  }

  return (
    <button type='button' className={classes}>
      {text}
    </button>
  );
};

export default FilterButton;
