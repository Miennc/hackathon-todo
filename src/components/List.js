import * as React from 'react';
import { useEffect, useState, useRef } from "react";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc, onSnapshot, addDoc, query, where } from 'firebase/firestore';
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { getAuth, signOut } from "firebase/auth";

const List = () => {
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const focus = useRef(null);
  let unsub = null;
  useEffect(() => {
    (async () => {
      console.log(user.email);
        const collectionRef = collection(db, 'todos');
        const collectionQuery = query(collectionRef, where('userId', '==', user.uid));
        unsub = onSnapshot(collectionQuery, (snapShot) => {
          const localTodos = [];
          snapShot.forEach(doc => {
            localTodos.push({
              id: doc.id,
              message: doc.data().message
            });
          });
          setTodos(localTodos);
        });

    })();
  }, []);
  const deleteNote = async (id) => {
    const docRef = doc(db, 'todos', id);
    await deleteDoc(docRef);
  }

  const addNote = async () => {
    // const collectionRef = collection(db, 'todos');
    // await addDoc(collectionRef, { message });
    // setMessage('');
    // focus.current.focus();
    if (user) {
      const userId = user.uid;
      const collectionRef = collection(db, 'todos');
      await addDoc(collectionRef, { message, userId });
      setMessage('');
      focus.current.focus();
    } else {
      alert('Đăng nhập vào rồi làm gì thì làm bạn êiiii');
    }
  }
  const signOut = async () => {
    const auth = getAuth();
    signOut(auth).then(() => {
      localStorage.removeItem('user');
    }).catch((error) => {
      console.log(error);
    });
  }

  return (
    <div className="container mx-auto">
      <div className="flex justify-center ">
        <div className="font-bold text-2xl mx-2">{user?.email}</div>
      </div>
      <div className="h-auto w-full flex items-center justify-center bg-teal-lightest font-sans">
        <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
          <div className="mb-4">
            <div className="flex justify-between">
              <h1 className="text-grey-darkest text-2xl font-bold ">Todo List</h1>
              <div className=" border-2 rounded hover:text-white text-green  p-2 hover:bg-green-500 border-green-600"><button>
                <Link to="/login">Login</Link>
              </button></div>
              <div><button className="border-2 rounded hover:text-white text-green p-2 hover:bg-green-500  border-green-600">
                <Link to="/signup">Register</Link>
              </button></div>
              <div><button className="border-2 rounded hover:text-white text-green p-2 hover:bg-green-500  border-green-600"
                onClick={signOut} >
                Logout
              </button></div>
            </div>
            <div className="flex mt-4">
              <input className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Add Todo"
                onChange={(e) => setMessage(e.target.value)} value={message} ref={focus} />
              <button className="flex-no-shrink p-2 border-2 rounded text-teal border-teal-400 hover:text-white hover:bg-teal-500"
                onClick={addNote} >Add</button>
            </div>
          </div>
          <div>
            {
              todos.map((todo, index) => {
                return (
                  <div className="flex mb-4 items-center" key={index}>
                    <p className="w-full text-grey-darkest font-bold text-2xl">{todo.message}</p>
                    <button className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green  hover:bg-green-500 border-green-600">
                      <Link to={`/edit?id=${todo.id}`}>Edit</Link>
                    </button>
                    <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red-500 hover:text-white hover:bg-red-500" onClick={() => deleteNote(todo.id)}>Remove</button>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default List;