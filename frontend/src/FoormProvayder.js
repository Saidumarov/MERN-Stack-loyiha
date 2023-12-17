import React, { useState } from "react";
export const Foorm = React.createContext();
function FoormProvayder({ children }) {
  const [isupdate, setIsUpdate] = useState(false);
  const [updateContact, setUpdateContact] = useState({
    name: "",
    user: "",
    number: "",
    img: "",
    id: "",
  });
  return (
    <div>
      <Foorm.Provider
        value={{ isupdate, setIsUpdate, updateContact, setUpdateContact }}
      >
        {children}
      </Foorm.Provider>
    </div>
  );
}
export default FoormProvayder;
