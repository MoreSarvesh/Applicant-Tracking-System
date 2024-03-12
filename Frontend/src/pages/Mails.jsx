import { useState } from "react";
import Maillist from "../components/Maillist.component.jsx";
import Pageheader from "../components/Pageheader.component.jsx";
import CrerateEmail from "../components/CrerateEmail.component.jsx";
import Modal from "../components/Modal.component.jsx";

const Mails = () => {
  const [showModal, setShowModal] = useState(false);
  return (
    <main className="jb-main">
      <Pageheader title="Emails" />
      <div className="jb-content">
        <div className="left">
          <div className="searchbar">
            <form action="#" className="form-search">
              <input type="text" placeholder="Search Job" />
            </form>
            <button onClick={() => setShowModal(true)}>Compose Mail</button>
          </div>
          <div className="listings">
            <div className="listings-job">
              <ul>
                <Maillist
                  subject="Subject 1"
                  to="sarveshmorer13244@gmail.com"
                  date="06-03-2024"
                />
              </ul>
            </div>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal title="Compose Email" setShowModal={setShowModal}>
          <CrerateEmail />
        </Modal>
      )}
    </main>
  );
};

export default Mails;
