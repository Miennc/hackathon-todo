import * as React from 'react';
import { useEffect } from "react";
import { db } from "../firebase";
import { collection, getDocs, deleteDoc, doc, onSnapshot, addDoc } from 'firebase/firestore';
import { Link } from "react-router-dom";

const List = () => {
  const [todos, setTodos] = React.useState([]);
  const [message, setMessage] = React.useState('');
  let unsub = null;
  useEffect(() => {
    console.log('List');
    (async () => {
      const collectionRef = collection(db, 'todos');
      unsub = onSnapshot(collectionRef, (snapShot) => {
        const localTodos = [];
        console.log("Có sự thay đổi dữ liệu");
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

  const AddNote = async () => {
    const collectionRef = collection(db, 'todos');
    await addDoc(collectionRef, { message });
    setMessage('');
  }
   
  return (
    <div className="container mx-auto">
      <div >
        <input type="text" placeholder="add to do"
          onChange={(e) => setMessage(e.target.value)} value={message} className="border-2 border-emerald-500" />
        <button onClick={AddNote}>ADD NOTE</button>
      </div>
      <ul>
        {todos.map((todo, index) => (

          <li key={index}>{todo.message}
          
            <Link to={`/edit?id=${todo.id}`} className="text-yellow-500">Edit</Link>
            <button onClick={() => {
              deleteNote(todo.id)
            }} className="text-red-500">Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;