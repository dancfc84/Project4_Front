import Modal from "../UI/Modal";
import { useNavigate } from "react-router-dom";
import styles from './ContactModal.module.css'

const ContactModal = () => {


  const navigate = useNavigate()

  const dismissButtonHandler = () => {
    navigate("/")
  }

  return (
    <Modal>
      <div className="container column box">
        <div className="title is-2"></div>
        <div className={`${styles.text_container} field column`}>
          <label className="label">Thank You, your message has been received, we aim to reply within 48 hours</label>
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

export default ContactModal;
