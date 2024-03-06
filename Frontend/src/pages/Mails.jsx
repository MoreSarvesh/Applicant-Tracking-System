import Maillist from "../components/Maillist.component.jsx";
import Pageheader from "../components/Pageheader.component.jsx";

const Mails = () => {
  return (
    <main className="jb-main">
      <Pageheader title="Emails" />
      <div className="jb-content">
        <div className="left">
          <div className="searchbar">
            <form action="#" className="form-search">
              <input type="text" placeholder="Search Job" />
            </form>
            <button>Compose Mail</button>
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
    </main>
  );
};

export default Mails;
