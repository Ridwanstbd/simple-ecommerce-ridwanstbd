/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";

const BackdropOverlay = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-screen z-40 bg-black bg-opacity-75 transition-all" />
  );
};

const ModalOverlay = ({ show, onClose, children }) => {
  const [translateX, setTranslateX] = useState("100%")
  useEffect(() => {
    if (show) {
      setTranslateX("100%")
    } else {
      setTranslateX("0%")
    }
  }, [show, onClose])
  return (
    <div className="fixed top-0 left-0 w-full h-screen my-3 flex items-center justify-end z-50 transition-transform "
      style={{ transform: `translateX(${translateX})` }}>
      <div className="bg-white p-4 rounded-lg shadow-lg text-gray-900 mx-2">
        {children}
      </div>
    </div>
  );
};
const portalElement = document.getElementById("modal");

const Modal = ({ show, onClose, children }) => {
  return (
    <div>
      {ReactDOM.createPortal(<BackdropOverlay />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay show={show} onClose={onClose} >{children}</ModalOverlay>,
        portalElement
      )}
    </div>
  );
};
export default Modal;
