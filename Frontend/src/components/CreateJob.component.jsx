import { useState } from "react";

const CreateJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [openings, setOpenings] = useState(0);
  const [custom, setCustom] = useState([]);
  const [label, setlabel] = useState("");
  const [ftype, setFtype] = useState("text");
  const [showOptions, setShowOptions] = useState(false);
  const [options, setOptions] = useState([]);
  const [optionsinput, setOptionsinput] = useState("");

  const handleAddCustomField = (e) => {
    e.preventDefault();
    const newField = {
      label: label,
      type: ftype,
      options: options,
    };
    setCustom((prev) => [...prev, newField]);
    setlabel("");
    setOptions([]);
    console.log(custom);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Job Created");
  };

  const addOptions = (e) => {
    e.preventDefault();
    setOptions((prev) => [...prev, optionsinput]);
    setOptionsinput("");
  };
  return (
    <div className="jb-form-container">
      <form onSubmit={handleSubmit} className="jb-creation-form">
        <label htmlFor="title">
          Title:
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </label>
        Description:
        <label htmlFor="description">
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          ></textarea>
        </label>
        <label htmlFor="openings">
          Openings:
          <input
            type="number"
            name="openings"
            id="openings"
            value={openings}
            onChange={(e) => {
              setOpenings(e.target.value);
            }}
          />
        </label>
        <fieldset>
          <legend>Candidate Application Fields</legend>
          <p>Mandatory Fields: Name, Email, Resume</p>
          <p>Custom Fields: {custom.toString()}</p>
        </fieldset>
        <button type="submit">Create Job</button>
      </form>
      <form onSubmit={(e) => handleAddCustomField(e)} className="custom-form">
        <fieldset>
          <legend>Add Custom Fields</legend>
          <label htmlFor="label">
            Label:
            <input
              type="text"
              name="label"
              id="label"
              value={label}
              onChange={(e) => {
                setlabel(e.target.value);
              }}
            />
          </label>
          <div>
            <label htmlFor="type">
              Type:
              <select
                name="type"
                id="type"
                value={ftype}
                onChange={(e) => {
                  setFtype(e.target.value);
                  if (
                    e.target.value === "radio" ||
                    e.target.value === "checkbox"
                  ) {
                    setShowOptions(true);
                  } else {
                    setShowOptions(false);
                  }
                }}
              >
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="radio">Radio</option>
                <option value="checkbox">Checkbox</option>
              </select>
            </label>
          </div>
          {showOptions && (
            <div>
              <label htmlFor="options">
                Options:
                <input type="text" name="options" id="options" />
              </label>
              <button
                onClick={(e) => {
                  addOptions(e);
                }}
              >
                Add
              </button>
            </div>
          )}
          <button type="submit">Add Field</button>
        </fieldset>
      </form>
    </div>
  );
};

export default CreateJob;
