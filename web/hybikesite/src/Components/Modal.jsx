// Modal component in react

// src\Components\Modal.jsx
import React, { useEffect, useRef } from "react";
import { Button } from "./Button";

export function Modal({ children, showModal, setShowModal }) {
  const modalRef = useRef();
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

  const handleOutsideClick = (e) => {
    if (modalRef.current === e.target) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  return (
    <>
      {/* <button onClick={openModal}>Open Modal</button> */}
      {showModal ? (
        <div className="fixed w-screen h-screen z-10 text-black" ref={modalRef}>
          <div className="flex justify-center items-center w-full h-full">
            <div className="w-1/3 h-1/2 bg-gray-100 rounded-md shadow-lg">
              <Button onClick={closeModal}>Close</Button>
              {children}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
