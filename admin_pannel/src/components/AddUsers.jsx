import { useState } from "react";
import "./App.css";
import { useLocation } from "react-router-dom";

import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebaseConfig";

const AddUser = () => {
  const [selectedId, setSelectedId] = useState("");
  const [newName, setNewName] = useState("");
  const [newage, setNewage] = useState(0);
  const [newLname, setNewLname] = useState("");
  const [newClass, setNewClass] = useState("");
  const [newDivision, setNewDivision] = useState("");
  const [newRoll, setNewRoll] = useState("");
  const [newAddress, setNewAddress] = useState("");
  const [newAddress2, setNewAddress2] = useState("");
  const [newLandmark, setNewLandmark] = useState("");
  const [newCity, setNewCity] = useState("");
  const [newPincode, setNewPincode] = useState("");
  

  
  const userCollection = collection(db, "students");
  const createUser = async () => {
    await addDoc(userCollection, {
      first_name: newName,
      age: Number(newage),
      last_name: newLname,
      class: newClass,
      division: newDivision,
      roll_no:newRoll,
      address:newAddress,
      address2:newAddress2,
      landmark:newLandmark,
      city:newCity,
      pincode:newPincode,


    });
  };
  
const UpdateUser = async () => {
  const location = useLocation();
  const id = location.state.id;
  
  await updateDoc(doc(userCollection, id), {
    first_name: newName,
    age: Number(newage),
    last_name: newLname,
    class: newClass,
    division: newDivision,
  });
};




  return (
    <div className="AddingU">
      <input
        placeholder="First Name"
        onChange={(event) => {
          setNewName(event.target.value);
        }}
      />
      <input
        placeholder="last Name"
        onChange={(event) => {
          setNewLname(event.target.value);
        }}
      />
      <input
        type="number"
        placeholder="Age"
        onChange={(event) => {
          setNewage(event.target.value);
        }}
      />
      <input
        placeholder="class"
        onChange={(event) => {
          setNewClass(event.target.value);
        }}
      />
      <input
        placeholder="Division"
        onChange={(event) => {
          setNewDivision(event.target.value);
        }}
      />
      <input
        type="number"
        placeholder="Roll No"
        onChange={(event) => {
          setNewRoll(event.target.value);
        }}
      />
      <input
        placeholder="Address"
        onChange={(event) => {
          setNewAddress(event.target.value);
        }}
      />
      <input
        placeholder="Address 2"
        onChange={(event) => {
          setNewAddress2(event.target.value);
        }}
      />
      <input
        placeholder="Landmark"
        onChange={(event) => {
          setNewLandmark(event.target.value);
        }}
      />
      <input
        placeholder="City"
        onChange={(event) => {
          setNewCity(event.target.value);
        }}
      />
      <input
        type="number"
        placeholder="Pincode"
        onChange={(event) => {
          setNewPincode(event.target.value);
        }}
        
      />
      <button className="Add_button" onClick={createUser} type="submit">
        Add
      </button>
      <button
        className="UP-button"
        onClick={() => UpdateUser(selectedId)}
        type="submit"
      >
        Update
      </button>
    </div>
  );
};

export default AddUser;
