import Modal from "../UI/Modal";


const LoginRegisterModal = (props) => {


  const dismissButtonHandler = () => {
    props.setLoginRegisterModal(false)
  }

  return (
    <Modal>
      <div className="container column box">
        <div className="title is-2"></div>
        <div className="field column">
          <label className="label">You need to be logged in to sell or buy books, if you have an account please  <a href="/login">login.</a> Otherwise you can create an account <a href="/register">here</a></label>
          <div className="control">
          </div>
        </div>
        <div className="field container">
          <div className="control">
            <button
              type="button"
              className="button is-warning is-light my-5 mx-5 is-outlined"
              onClick={dismissButtonHandler}
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
      <div/>
    </Modal>
  );
};

export default LoginRegisterModal;