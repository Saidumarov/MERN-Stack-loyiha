import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Foorm } from "./FoormProvayder";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./Loading";
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
      img: "",
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
                <th scope="col">Img </th>
              </tr>
            </thead>
            <tbody>
              {contacts ? (
                contacts.length > 0 ? (
                  contacts.map((item, index) => (
                    <tr key={item._id}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.name}</td>
                      <td>{item.user}</td>
                      <td>{item.number}</td>
                      <td className="img">
                        <img src={item.img} alt="Note not found" />
                      </td>
                      <td
                        onClick={() => deleteContact(item._id)}
                        className="btn btn-outline-danger mx-2 my-1"
                      >
                        delete
                      </td>
                      <td
                        onClick={() => updateHander(item._id)}
                        className="btn btn-success"
                      >
                        update
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center">
                      No contacts found
                    </td>
                  </tr>
                )
              ) : (
                <Loading />
              )}
            </tbody>
          </table>
        ) : null}
      </div>
    </div>
  );
}

export default Contacts;
