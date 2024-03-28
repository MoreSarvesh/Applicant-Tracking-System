const Modal = ({ title, children, setShowModal }) => {
  return (
    <div className="modal-wrapper">
      <div className="modal">
        <div className="modal-heading">
          <h3>{title}</h3>
          <button
            className="modal-close-btn"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </div>
        <hr />
        {children}
      </div>
    </div>
  );
};

export default Modal;
