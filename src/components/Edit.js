import React, {useEffect} from 'react';
import {useSearchParams} from "react-router-dom";
import {doc, getDoc, updateDoc} from 'firebase/firestore';
import {db} from "../firebase";
import { useNavigate } from 'react-router-dom';
const Edit = () => {
    const [searchParam] = useSearchParams();
    const [message, setMessage] = React.useState('');
    let navigate = useNavigate();
    useEffect(() => {
        (async () => {
            const docRef = doc(db, 'todos', searchParam.get('id'));
            const docSnapshot = await getDoc(docRef);
            setMessage(docSnapshot.data().message);
        })();
    }, []);

    const editNote = async () => {
        const docRef = doc(db, 'todos', searchParam.get('id'));
        await updateDoc(docRef, {message: message});
        navigate('/list');
    };

    return (
        <div>
            <h1>Edit</h1>
            <input type="text"
                   onChange={(evt) => setMessage(evt.target.value)}
                   value={message} className="border-2 border-emerald-500"/>
            <button onClick={editNote}>Edit Note</button>
        </div>
    );
};

export default Edit;