import { useState, useEffect } from "react";
import { Form, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Modal from "../components/Modal.component.jsx";

const CandidateApplication = () => {
  const jid = useParams();
  const [applicationFormData, setApplicationFormData] = useState([]);
  const [candidateId, setCandidateId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [candidateData, setCandidateData] = useState({
    name: "",
    email: "",
    resume: "",
    details: {},
  });
  const [jobTitle, setJobTitle] = useState("");
  useEffect(() => {
    fetch(`http://localhost:5000/candidate/application?jid=${jid.id}`)
      .then((res) => res.json())
      .then((data) => {
        setApplicationFormData(data.details);
        setJobTitle(data.title);
      })
      .catch((err) => console.log(err));
  }, []);

  const handelInputChange = (e) => {
    if (e.target.name === "name" || e.target.name === "email") {
      const newData = { ...candidateData, [e.target.name]: e.target.value };
      setCandidateData(newData);
    } else {
      if (e.target.nodeName === "radio") {
        const newDetails = {
          ...candidateData.details,
          [e.target.name]: e.target.value,
        };
        const newData = { ...candidateData, details: newDetails };
        setCandidateData(newData);
      } else {
        const newDetails = {
          ...candidateData.details,
          [e.target.name]: e.target.value,
        };
        const newData = { ...candidateData, details: newDetails };
        setCandidateData(newData);
      }
    }
  };

  const handelCandidateFormSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted");
    console.log(candidateData);
    const formData = new FormData();
    formData.append("name", candidateData.name);
    formData.append("email", candidateData.email);
    formData.append("details", JSON.stringify(candidateData.details));
    formData.append("resume", candidateData.resume);
    const response = await toast.promise(
      fetch(`http://localhost:5000/candidate/store?jobid=${jid.id}`, {
        method: "POST",
        body: formData,
      }),
      {
        pending: "Submitting response",
        error: "Error",
        success: "Success",
      }
    );
    if (!response.ok) {
      console.log("Application Failed");
      const applicationFailData = await response.json();
      console.log(applicationFailData);
      return;
    }
    console.log("Applied Successfully");
    const jobApplicationData = await response.json();
    console.log(jobApplicationData);
    setCandidateId(jobApplicationData.candidateId);
    setShowModal(true);
    return;
  };

  return (
    <>
      <h1 className="candidate-application-form-title">
        {jobTitle} Application Form
      </h1>
      <form
        className="candidate-application-form"
        onSubmit={handelCandidateFormSubmit}
      >
        <label htmlFor="name">
          Name:
          <input
            type="text"
            name="name"
            id="name"
            value={candidateData.name}
            onChange={handelInputChange}
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="text"
            name="email"
            id="email"
            value={candidateData.email}
            onChange={handelInputChange}
          />
        </label>
        <label htmlFor="resume">
          Resume:
          <input
            type="file"
            name="resume"
            id="resume"
            accept="application/pdf"
            onChange={(e) => {
              setCandidateData((prev) => {
                return { ...prev, resume: e.target.files[0] };
              });
            }}
          />
        </label>
        {applicationFormData?.map((data) => {
          switch (data.inputType) {
            case "text":
              return (
                <label key={data._id}>
                  {data.label}:
                  <input
                    type="text"
                    name={data.label}
                    value={candidateData.details[data.label] || ""}
                    onChange={handelInputChange}
                  />
                </label>
              );
            case "number":
              return (
                <label key={data._id}>
                  {data.label}:
                  <input
                    type="number"
                    name={data.label}
                    value={candidateData.details[data.label] || 0}
                    onChange={handelInputChange}
                  />
                </label>
              );
            case "radio":
              return (
                <label key={data._id}>
                  {data.label}:
                  {data.options.map((option) => {
                    return (
                      <label key={option}>
                        <input
                          type="radio"
                          name={data.label}
                          value={option}
                          checked={candidateData.details[data.label] === option}
                          onChange={handelInputChange}
                        />
                        {option}
                      </label>
                    );
                  })}
                </label>
              );

            default:
              break;
          }
        })}
        <button type="submit">Submit</button>
      </form>
      {showModal && (
        <Modal title="Successfully Applied" setShowModal={setShowModal}>
          {"Save your Candidate ID for Future reference" + candidateId}
        </Modal>
      )}
    </>
  );
};

export default CandidateApplication;
