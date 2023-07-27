const OptionsVaksin = (props) => {
  return (
    <div className="options">
      <h1 className="options-header">{props.title}</h1>
      <div className="options-container">
        {props.options.map((option) => {
          return (
            <div
              className="option-item font-bold"
              // onClick={option.handler}
              key={option.id}
            >
              {option.id > 1 ? option.namevaksin : "vaksin"}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OptionsVaksin;
