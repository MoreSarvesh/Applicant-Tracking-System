import { useState } from "react";

const CrerateEmail = () => {
  const [sender, setSender] = useState("");
  const [password, setPassword] = useState("");
  const [subject, setSubject] = useState("");
  const [prompt, setPrompt] = useState("");
  const [body, setBody] = useState("");
  const [to, setTo] = useState([]);
  const [toEmail, setToEmail] = useState("");

  const handleEmailSubmission = (e) => {
    e.preventDefault();
    console.log("Email Crerated");
  };

  const addRecieverMail = (e) => {
    e.preventDefault();
    setTo((prev) => [...prev, toEmail]);
    setToEmail("");
  };
  return (
    <div className="jb-form-container">
      <form onSubmit={handleEmailSubmission} className="jb-creation-form">
        <label htmlFor="sender">
          Sender Email:
          <input
            type="text"
            name="sender"
            id="sender"
            value={sender}
            onChange={(e) => {
              setSender(e.target.value);
            }}
          />
        </label>
        <label htmlFor="password">
          Sender Password:
          <input
            type="text"
            name="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </label>
        <div className="reciever">
          <label htmlFor="reciever">
            Reciever Email:
            <input
              type="text"
              name="reciever"
              id="reciever"
              value={toEmail}
              onChange={(e) => {
                setToEmail(e.target.value);
              }}
            />
          </label>
          <button onClick={(e) => addRecieverMail(e)}>Add</button>
        </div>
        <p>TO: {to.toString()}</p>
        <label htmlFor="subject">Mail subject:</label>
        <textarea
          name="subject"
          id="subject"
          cols="70"
          rows="5"
          value={subject}
          onChange={(e) => {
            setSubject(e.target.value);
          }}
        ></textarea>
        <label htmlFor="prompt">Mail Prompt:</label>
        <textarea
          name="prompt"
          id="prompt"
          cols="70"
          rows="5"
          value={prompt}
          onChange={(e) => {
            setPrompt(e.target.value);
          }}
        ></textarea>
        <button
          onClick={(e) => {
            generateAssessment(e);
          }}
        >
          Generate Email
        </button>
        <label htmlFor="body">Mail body:</label>{" "}
        <textarea
          name="body"
          id="body"
          cols="70"
          rows="10"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
        ></textarea>
        <button type="submit">Create Assessment</button>
      </form>
    </div>
  );
};

export default CrerateEmail;
