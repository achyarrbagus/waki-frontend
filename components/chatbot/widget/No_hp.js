const No_hp = (props) => {
  console.log(props);
  return (
    <>
      <div className="options">
        <h1 className="options-header">No handphone</h1>
        <div className="options-container">
          <div className="flex flex-col w-3/5">
            <div
              className="option-item font-bold"
              onClick={props.actionProvider.handleInputNoHP}
              key="1"
            >
              <p className="">+62</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default No_hp;
