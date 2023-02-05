import React from "react";
import { useLocation } from "react-router-dom";
import { db } from "../firebaseConfig";
import { doc, getDoc, collection } from "firebase/firestore";
import { useState, useEffect } from "react";

function View() {
  const location = useLocation();
  const id = location.state.id;
  const [user, setUser] = useState({});
  const userCollection = collection(db, "students");

  useEffect(() => {
    const getUser = async () => {
      const data = await getDoc(doc(userCollection, id));
      setUser({ ...data.data(), id: data.id });
    };
    getUser();
  }, []);

  return (
    <div className="user-info">
      <p>First Name: {user.first_name}</p>
      <p>Last Name: {user.last_name}</p>
      <p>Age: {user.age}</p>
      <p>Class: {user.class}</p>
      <p>Division: {user.division}</p>
      <p>Roll No: {user.roll_no}</p>
      <p>Address: {user.address}</p>
      <p>Address 2: {user.address2}</p>
      <p>Landmark: {user.landmark}</p>
      <p>City: {user.city}</p>
      <p>Pincode: {user.pincode}</p>
    </div>
  );
}

export default View;
