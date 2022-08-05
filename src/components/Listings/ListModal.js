import React, { useState } from "react";
// import classes from "./LoginModal.module.css"
import Modal from "../UI/Modal";
import axios from "axios";
import baseUrl from "../../config"



const LoginModal = (props) => {



  const [modalForm, setModalForm] = useState({
    type_id: 0,
    condition_id: 0,
  });


  async function handleListingConfirm () {
    try {
      const { data } = await axios.post(`${baseUrl}/books/${props.bookId}/listing`, modalForm, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      console.log(data);
      props.hideModalHandler()

    } catch (error) {

      console.log(error);

    }
  }

  const typeOptions = [
    { value: "null", text: '--Choose an option--' },
    { value: 1, text: 'Paperback' },
    { value: 2, text: 'Hardback' }
  ];

  const conditionOptions = [
    { value: "null", text: '--Choose an option--' },
    { value: 1, text: 'Like New' },
    { value: 2, text: 'Excellent' },
    { value: 3, text: 'Good' },
    { value: 4, text: 'Satisfactory' },
    { value: 5, text: 'Poor' }
  ];


  const handleTypeChange = event => {
    console.log(event.target.value);
    setModalForm({
      ...modalForm,
      type_id: event.target.value,
    })
  };

  const handleConditionChange = event => {
    console.log(event.target.value);
    setModalForm({
      ...modalForm,
      condition_id: event.target.value,
    })
  };


  console.log(modalForm);

  return (

    <Modal hideModalHandler={props.hideModalHandler}>
      <div className="container column box">
        <div className="title is-2">Sell Book</div>
        <hr />
        <form onSubmit={handleListingConfirm}>
          <div>
            <label className="label">Book Type</label>
            <select onChange={handleTypeChange}>
              {typeOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">Book Condition</label>
            <select onChange={handleConditionChange}>
              {conditionOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.text}
                </option>
              ))}
            </select>
          </div>

          <div className="field container">
            <div className="control">
              <button
                type="button"
                className="button is-primary mx-5 my-5"
                onClick={handleListingConfirm}
              >
                Sell Book
              </button>
              <button
                type="button"
                className="button is-warning is-light my-5 mx-5 is-outlined"
                onClick={props.hideModalHandler}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default LoginModal;
