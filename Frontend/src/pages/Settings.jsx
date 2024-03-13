import { useState } from "react";
import Pageheader from "../components/Pageheader.component.jsx";

const Settings = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [apiKey, setApiKey] = useState("");

  const handleSettingSubmit = (e) => {
    e.preventDefault();
    console.log("Settings Changed");
  };
  const handleSettingReset = (e) => {
    e.preventDefault();
    //reset value to default from database
    setUsername("");
    setPassword("");
    setApiKey("");
    console.log("Settings Reset");
  };

  return (
    <div className="jb-main">
      <Pageheader title="Settings" />
      <div className="settings">
        <form
          className="setting-form"
          onSubmit={handleSettingSubmit}
          onReset={handleSettingReset}
        >
          <label htmlFor="username">
            Username:
            <input
              type="text"
              name="username"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <label htmlFor="password">
            Password:
            <input
              type="text"
              name="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <label htmlFor="apikey">
            API-Key:
            <input
              type="text"
              name="apikey"
              id="apikey"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
            />
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
