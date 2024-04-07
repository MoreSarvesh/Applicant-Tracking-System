import { useState } from "react";
import { toast } from "react-toastify";

const CreateJob = ({ setShowModal }) => {
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
      inputType: ftype,
      options: options,
    };
    setCustom((prev) => [...prev, newField]);
    setlabel("");
    setOptions([]);
    console.log(newField);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newJob = {
      title: title,
      description: description,
      openings: openings,
      applicationForm: custom,
    };

    console.log(newJob);
    const response = await toast.promise(
      fetch("http://localhost:5000/joblistings/postjob", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newJob),
      }),
      {
        pending: "Submitting Request",
        success: "Job created Successfully",
        error: "Error",
      }
    );

    if (!response.ok) {
      console.log("Job Creation Failed");
      const jobFailData = await response.json();
      console.log(jobFailData);
      return toast.error(jobFailData.error);
    }
    console.log("New Job Created");
    const jobData = await response.json();
    console.log(jobData);
    toast.success(jobData.message);
    setShowModal(false);
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
          Job Title:
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            required
          />
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
            required
          />
        </label>

        <label htmlFor="description">Job Description:</label>
        <textarea
          name="description"
          id="description"
          rows="10"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          required
        ></textarea>
        <fieldset>
          <legend>Candidate Application Fields</legend>
          <p>Mandatory Fields: Name, Email, Resume</p>
          <p>Custom Fields: {custom.map((field) => field.label).toString()}</p>
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
              required
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
                  if (e.target.value === "radio") {
                    setShowOptions(true);
                  } else {
                    setShowOptions(false);
                  }
                }}
              >
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="radio">Radio</option>
              </select>
            </label>
          </div>
          {showOptions && (
            <div>
              <label htmlFor="options">
                Options:
                <input
                  type="text"
                  name="options"
                  id="options"
                  value={optionsinput}
                  onChange={(e) => setOptionsinput(e.target.value)}
                />
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
