import { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import "./App.css";
import { getAuth, signOut } from "firebase/auth";

import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function Data() {
  const [students, setStudents] = useState([]);
  const userCollection = collection(db, "students");

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userCollection);
      setStudents(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getUsers();
  }, []);
  const navigate = useNavigate();

  const AddPage = () => {
    navigate("/add");
  };

  const UpdateUser = (id) => {
    navigate("/add", { state: { id: id } });
  };

  const deleteUser = async (id) => {
    await deleteDoc(doc(userCollection, id));
    setStudents((prevState) =>
      prevState.filter((students) => students.id !== id)
    );
  };

  const navigateToViewPage = (id) => {
    navigate("/views", { state: { id: id } });
  };

  const auth = getAuth();
  const logout = () => {
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
      });
  };

  return (
    <div className="table">
      <div className="tabel">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Class</th>
              <th>Division</th>
              <th>Roll No</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((user) => (
              <tr>
                <td>
                  {user.first_name}
                  <span> </span>
                  {user.last_name}
                </td>
                <td>{user.age}</td>
                <td>{user.class}</td>
                <td>{user.division}</td>
                <td>{user.roll_no}</td>
                <button className="Action" onClick={() => UpdateUser(user.id)}>
                  Update
                </button>
                <button className="Action" onClick={() => deleteUser(user.id)}>
                  delete
                </button>
                <button
                  className="Action"
                  onClick={() => navigateToViewPage(user.id)}
                >
                  View
                </button>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button className="Addpg" onClick={() => AddPage()}>
        Add students
      </button>
      <button className="Addpg" onClick={() => logout()}>
        Logout
      </button>
    </div>
  );
}

export default Data;
