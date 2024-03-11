import { useState } from "react";

const CreateJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [openings, setOpenings] = useState(0);
  const [custom, setCustom] = useState([]);
  const [custominput, setCustominput] = useState("");

  const handleAddCustomField = (e) => {
    setCustom((prev) => [...prev, custominput]);
    setCustominput("");
    e.stopPropagation();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("New Job Created");
    console.log(title);
    console.log(description);
    console.log(openings);
    console.log(custom);
  };
  return (
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
        <input
          type="text"
          name="description"
          id="description"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
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
        />
      </label>
      <p>Custom Feilds: {custom.toString()}</p>
      <fieldset>
        <legend>Add Custom Fields</legend>
        <label htmlFor="custom">
          <input
            type="text"
            name="custom"
            id="custom"
            value={custominput}
            onChange={(e) => {
              setCustominput(e.target.value);
            }}
          />
        </label>
        <button onClick={(e) => handleAddCustomField(e)}>Add</button>
      </fieldset>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CreateJob;
