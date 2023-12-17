import React, { useContext, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Contacts from "./Contacts";
import { Foorm } from "./FoormProvayder";

function AppLayout() {
  const { isupdate, setIsUpdate, updateContact, setUpdateContact } =
    useContext(Foorm);

  const [contact, setContact] = useState({
    name: "",
    user: "",
    number: "",
    img: "",
  });

  const updateContactHander = (id) => {
    axios.put("http://localhost:5000/put/" + id, updateContact);
    toast.success("Contact edited");
  };
  const submit = (e) => {
    e.preventDefault();
    setIsUpdate(false);
  };

  const handelchange = (e) => {
    const { name, value } = e.target;
    setContact((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const submithandler = (e) => {
    e.preventDefault();
    const { name, number, user, img } = contact;
    const newContact = { name, number, user, img };
    axios.post("/newContact", newContact);
    toast.success("Contact added");
    setContact({
      name: "",
      user: "",
      number: "",
      img: "",
    });
  };

  const handelUpdate = (e) => {
    const { name, value } = e.target;
    setUpdateContact((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  return (
    <>
      <ToastContainer />
      <Navbar />
      {!isupdate ? (
        <form className="w-50 m-auto">
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Enter your name
            </label>
            <input
              onChange={handelchange}
              name="name"
              type="name"
              value={contact.name}
              className="form-control"
              id="name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="last" className="form-label">
              Enter your last name
            </label>
            <input
              onChange={handelchange}
              name="user"
              type="user"
              value={contact.user}
              className="form-control"
              id="last"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="number" className="form-label">
              Enter your number
            </label>
            <input
              id="number"
              onChange={handelchange}
              name="number"
              type="number"
              value={contact.number}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="img" className="form-label">
              Enter your img
            </label>
            <input
              id="img"
              onChange={handelchange}
              name="img"
              type="img"
              value={contact.img}
              className="form-control"
            />
          </div>
          <button
            disabled={
              !contact.name || !contact.user || !contact.number || !contact.img
            }
            onClick={submithandler}
            className="btn btn-primary mt-4"
          >
            Submit
          </button>
        </form>
      ) : (
        <form className="w-50 m-auto" onSubmit={submit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              Enter your name
            </label>
            <input
              onChange={handelUpdate}
              name="name"
              type="name"
              value={updateContact.name}
              className="form-control"
              id="name"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="last" className="form-label">
              Enter your last name
            </label>
            <input
              onChange={handelUpdate}
              name="user"
              type="user"
              value={updateContact.user}
              className="form-control"
              id="last"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="number" className="form-label">
              Enter your number
            </label>
            <input
              id="number"
              onChange={handelUpdate}
              name="number"
              type="number"
              value={updateContact.number}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="img" className="form-label">
              Enter your img
            </label>
            <input
              id="img"
              onChange={handelUpdate}
              name="img"
              type="img"
              value={updateContact.img}
              className="form-control"
            />
          </div>
          <button
            onClick={() => updateContactHander(updateContact.id)}
            className="btn btn-primary mt-4"
            disabled={
              !updateContact.name ||
              !updateContact.user ||
              !updateContact.number ||
              !updateContact.img
            }
          >
            Change
          </button>
          <button
            onClick={() => setIsUpdate(false)}
            className="btn btn-primary mt-4 mx-2"
          >
            Close
          </button>
        </form>
      )}
      <Contacts />
    </>
  );
}

export default AppLayout;
