import Modal from "../UI/Modal";
import styles from './LoginRegisterModal.module.css'


const LoginRegisterModal = (props) => {


  const dismissButtonHandler = () => {
    props.setLoginRegisterModal(false)
  }

  return (
    <Modal>
      <div className="container column box">
        <div className="title is-2"></div>
        <div className={`${styles.text_container} field column`}>
          <label className={`${styles.label_text}`}>You need to be logged in to sell or buy books, if you have an account please  <a href="/login">login.</a> </label>
          <label className={`${styles.label_text}`}>Otherwise you can create an account <a href="/register">here</a></label>
          <div className="control">
          </div>
        </div>
        <div className="field container">
          <div className={`${styles.button_container} control`}>
            <button
              type="button"
              className={`${styles.dismiss_button}`}
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