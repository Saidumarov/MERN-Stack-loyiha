import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Foorm } from "./FoormProvayder";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Contacts() {
  const { isupdate, setIsUpdate, updateContact, setUpdateContact } =
    useContext(Foorm);

  const [contacts, setContacts] = useState();

  const deleteContact = (id) => {
    axios.delete("http://localhost:5000/delete/" + id);
    toast.error("Contact deleted ");
  };
  const updateHander = (id) => {
    setUpdateContact({
      name: "",
      user: "",
      number: "",
      id: id,
    });
    setIsUpdate(true);
  };

  useEffect(() => {
    fetch("http://localhost:5000/contact/")
      .then((response) => response.json())
      .then((data) => setContacts(data))
      .catch((error) => console.error("Error:", error));
  }, [contacts]);

  return (
    <div className="tablee">
      <div>
        {!isupdate ? (
          <table className="table table-striped ">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Last name</th>
                <th scope="col">Phone</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts?.map((item, index) => {
                return (
                  <tr>
                    <th scope="row">{index + 1}</th>
                    <td>{item?.name}</td>
                    <td>{item?.user}</td>
                    <td>{item?.number}</td>
                    <td
                      onClick={() => deleteContact(item?._id)}
                      className="btn btn-outline-danger mx-2 my-1"
                    >
                      delete
                    </td>
                    <td
                      onClick={() => updateHander(item?._id)}
                      className="btn btn-success"
                    >
                      update
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : null}
      </div>
    </div>
  );
}

export default Contacts;
