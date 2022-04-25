import React, { useEffect } from 'react';
import { useSearchParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from "../firebase";
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
        await updateDoc(docRef, { message: message });
        navigate('/list');
    };

    return (
        <div className="container mx-auto ">
            <div className="container mx-auto">
                <div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
                    <div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
                        <div className="mb-4">
                            <h1 className="text-grey-darkest text-2xl font-bold ">Edit Note</h1>
                            <div className="flex mt-4">
                                <input className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Add Todo"
                                    onChange={(e) => setMessage(e.target.value)} value={message} />
                                <button className="flex-no-shrink p-2 border-2 rounded text-teal border-teal-400 hover:text-white hover:bg-teal-500"
                                    onClick={editNote} >Edit</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Edit;