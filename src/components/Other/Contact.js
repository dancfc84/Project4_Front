import React, { useRef, useState } from "react"
import emailjs from '@emailjs/browser'
import ContactModal from "./ContactModal"
import styles from "../Other/Contact.module.css"


export default function Contact() {


  const form = useRef();
  const [showContactModal, setShowContactModal] = useState(false)


  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_xh4ns7m', 'template_nsunmj8', form.current, 'bUjb33xbji2aeQPqW')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });

    setShowContactModal(true)
  };


  return (
    <section>
      <div >
        <div className={styles.text_header}>
          <h2 className={styles.text_header}>Get in touch</h2>
        </div>
        <div className={styles.form_container}>
          <form className={styles.form} ref={form} onSubmit={sendEmail}>
            <div  className={styles.form_fields}>
              <label >Name</label>
              <input type="text" name="user_name" />
            </div>
            <div  className={styles.form_fields}>
              <label >Email</label>
              <input type="email" name="user_email" />
            </div>
            <div  className={styles.form_fields}>
              <label >Message</label>
              <textarea name="message" />
            </div>
            <div className={styles.button_container}>
              <input className={styles.contact_button} type="submit" value="Send" />
            </div>
          </form>
        </div>
      </div>
      {
        showContactModal && <ContactModal/>
      }
    </section>
  );
}