import { useState } from "react";
import { toast } from "react-toastify";

const CrerateEmail = ({ setShowModal }) => {
  const [sender, setSender] = useState("");
  const [password, setPassword] = useState("");
  const [subject, setSubject] = useState("");
  const [purpose, setPurpose] = useState("");
  const [keyPoints, setKeyPoints] = useState("");
  const [attachmentsLinks, setAttachmentsLinks] = useState("");
  const [body, setBody] = useState("");
  const [to, setTo] = useState([]);
  const [toEmail, setToEmail] = useState("");

  //mail submisssion
  const handleEmailSubmission = async (e) => {
    e.preventDefault();
    const newEmail = {
      user: sender,
      pwd: password,
      subject,
      body,
      to,
    };
    console.log(newEmail);
    const response = await toast.promise(
      fetch("http://localhost:5000/mails/compose", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEmail),
      }),
      {
        pending: "Sending Email",
        success: "Email Sent",
        error: "Error",
      }
    );

    if (!response.ok) {
      console.log("Email Sending Failed");
      const emailFailData = await response.json();
      console.log(emailFailData);
      return toast.error(emailFailData.error);
    }
    console.log("New email Created");
    const emailData = await response.json();
    console.log(emailData);
    setShowModal(false);
    return toast.success(emailData.message);
  };

  //receiver mailaddress
  const addRecieverMail = (e) => {
    e.preventDefault();
    setTo((prev) => [...prev, toEmail]);
    setToEmail("");
  };

  //generate body
  const generateAssessment = async (e) => {
    e.preventDefault();
    //set email body
    const prompt = {
      subject,
      recipient: to,
      purpose,
      keyPoints,
      attachmentsLinks,
    };
    console.log(prompt);
    const response = await toast.promise(
      fetch("http://localhost:5000/mails/generate", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prompt),
      }),
      {
        pending: "Generating",
        success: "Successfully Generatted",
        error: "Error",
      }
    );

    if (!response.ok) {
      console.log("Email Creation Failed");
      const emailFailData = await response.json();
      console.log(emailFailData);
      return toast.error(emailFailData.error);
    }
    console.log("New Body Created");
    const emailBodyData = await response.json();
    console.log(emailBodyData);
    setBody(emailBodyData.data);
    return toast.success(emailBodyData.message);
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
            required
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
            required
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
          <button onClick={addRecieverMail}>Add</button>
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
          required
        ></textarea>
        <label htmlFor="purpose">
          Purpose:
          <input
            type="text"
            name="purpose"
            id="purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            required
          />
        </label>
        <label htmlFor="keypoints">
          Key-Points:
          <input
            type="text"
            name="keypoints"
            id="keypoints"
            value={keyPoints}
            onChange={(e) => setKeyPoints(e.target.value)}
            required
          />
        </label>
        <label htmlFor="attachmentslink">
          Links:
          <input
            type="text"
            name="attachmentslink"
            id="attachmentslink"
            value={attachmentsLinks}
            onChange={(e) => setAttachmentsLinks(e.target.value)}
          />
        </label>
        <button onClick={generateAssessment}>Generate Body</button>
        <label htmlFor="body">Mail body:</label>
        <textarea
          name="body"
          id="body"
          cols="70"
          rows="10"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
          required
        ></textarea>
        <button type="submit">Compose Mail</button>
      </form>
    </div>
  );
};

export default CrerateEmail;
