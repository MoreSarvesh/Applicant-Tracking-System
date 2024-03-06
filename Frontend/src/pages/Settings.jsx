import Pageheader from "../components/Pageheader.component.jsx";

const Settings = () => {
  return (
    <div className="jb-main">
      <Pageheader title="Settings" />
      <div className="settings">
        <form action="#" className="setting-form">
          <label htmlFor="username">
            Username:
            <input type="text" name="username" id="username" />
          </label>
          <label htmlFor="password">
            Password:
            <input type="text" name="password" id="password" />
          </label>
          <label htmlFor="apikey">
            API-Key:
            <input type="text" name="apikey" id="apikey" />
          </label>
          <div className="set-btn">
            <button type="submit">Save</button>
            <button type="reset">Reset</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
