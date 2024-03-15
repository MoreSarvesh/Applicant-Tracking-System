import { useState, useEffect } from "react";
import Maillist from "../components/Maillist.component.jsx";
import Pageheader from "../components/Pageheader.component.jsx";
import CrerateEmail from "../components/CrerateEmail.component.jsx";
import Modal from "../components/Modal.component.jsx";

const Mails = () => {
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [mails, setMails] = useState([]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    fetch("http://localhost:5000/mails/listmail", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setMails(data.details);
        console.log(data.details);
      });
  }, []);
  return (
    <main className="jb-main">
      <Pageheader title="Emails" />
      <div className="jb-content">
        <div className="left">
          <div className="searchbar">
            <form className="form-search" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                placeholder="Search Email"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
              />
            </form>
            <button onClick={() => setShowModal(true)}>Compose Mail</button>
          </div>
          <div className="listings">
            <div className="listings-job">
              <ul>
                {mails?.map((mail) => (
                  <Maillist
                    key={mail._id}
                    subject={mail.subject}
                    to={mail.to}
                    date={mail.date}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal title="Compose Email" setShowModal={setShowModal}>
          <CrerateEmail setShowModal={setShowModal} />
        </Modal>
      )}
    </main>
  );
};

export default Mails;
