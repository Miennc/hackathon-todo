import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../firebase";
import '../../src/App.css';
import { useNavigate } from 'react-router-dom';
const Signup = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    let navigate = useNavigate();
    const submitForm = async (evt) => {
        console.log(1)
        evt.preventDefault();
        if (email === '' || password === '') {
            alert('Please fill all the fields')
        } else if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
            alert('Please enter a valid email')
        } else if (password.length < 6) {
            alert('Password must be at least 6 characters')
        } else if (password.length > 20) {
            alert('Password must be less than 20 characters')
        } else {
            try {
                const response = await createUserWithEmailAndPassword(auth, email, password);
                console.log(response.user);
                alert('Register success')
                navigate('/login')
                sessionStorage.setItem('user', JSON.stringify(response.user));
            } catch (error) {
                console.log(error);
                alert('Registration Failed')
            }
        }

    };
    const _goToLogin = () => {
        navigate('/login')
    }


    return (
        <div className="container" id="container">
            <div className="width-fit w-3/4 mx-auto px-3 py-3">
                <div className="grid grid-cols-1">
                    <form action="" className="px-auto pt-6  bg-white rounded" onSubmit={formPrevent}>
                        <div className="">
                            <h1 className="font-bold text-2xl mb-7">Sign Up</h1>
                            <hr className="border-1 border-solid border-slate-100" />
                            <label htmlFor="email" className="font-bold">Email</label>
                            <input type="text" className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none bg-gray-300 focus:outline-none focus:shadow-outline focus:text-black focus:bg-zinc-300" id="email"
                                onChange={(evt) => setEmail(evt.target.value)} placeholder="Email" value={email} />
                            <label htmlFor="password" className="font-bold">Password</label>
                            <input type="password" className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none bg-gray-300 focus:outline-none focus:shadow-outline focus:text-black focus:bg-zinc-300" id="password"
                                onChange={(evt) => setPassword(evt.target.value)} placeholder="Password" value={password} />
                            <div className="mt-5">
                                <button className="w-1/3 mx-auto px-4 py-2 font-bold text-white bg-green-500 rounded-full hover:bg-green-700 focus:outline-none focus:shadow-outline hover:translate-x-3"
                                    onClick={submitForm}>Sign Up</button>
                            </div>
                        </div>
                        <p className="font-bold italic">or</p>
                    </form>
                </div>
                <div className="">
                <button className="w-1/3 mx-auto px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline hover:translate-x-3"
                    onClick={_goToLogin}>Sign In</button>
                </div>
                <p className="font-bold italic">if you have an account.</p>
            </div>
        </div>
    );
}
function formPrevent(e) {
    e.preventDefault();
}
export default Signup;