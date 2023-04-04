import React, { useState } from "react";
import axios from "axios";
import Button from "../Templates/Button/Button";
import "./ContactForm.css";
import { useAlert } from "react-alert";
import Loading from "../Templates/Loading/Loading";

const ContactForm = () => {
  const alert = useAlert();
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email && subject && message) {
      try {
        setLoading(true);
        const res = await axios.post(
          `${process.env.BASE_SERVER_URL}/api/user/send-email`,
          {
            email: email,
            subject: subject,
            message: message,
          }
        );
        setLoading(false);
        alert.success(res.data);
        setEmail("");
        setSubject("");
        setMessage("");
      } catch (error) {
        setLoading(false);
        alert.error(error.response.data);
      }
    }
  };

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="contact">
        <div className="contact-box">
          <input
            type="email"
            className="email-contact"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="text"
            className="subject-contact"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <textarea
          placeholder="Message"
          className="textarea-contact"
          value={message}
          maxLength="200"
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
      </div>
      <Button type="submit" name="Send"></Button>
      {loading && <Loading />}
    </form>
  );
};

export default ContactForm;
