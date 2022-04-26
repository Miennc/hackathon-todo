import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../firebase";
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    // const [error, setError] = useState('')
    let navigate = useNavigate();
    // const validate = () => {
    //     if (!email) {
    //         alert('Email is required')
    //         return;
    //     } else if (!/\S+@\S+\.\S+/.test(email)) {
    //         alert('Email is invalid')
    //         return;
    //     } else if (!password) {
    //         alert('Password is required')
    //         return;
    //     }
    // }
    const _doLogin = async (evt) => {
        evt.preventDefault();
        if (!email) {
            alert('Email is required')
            return;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            alert('Email is invalid')
            return;
        } else if (!password) {
            alert('Password is required')
            return;
        }else{
        try {
            const resp = await signInWithEmailAndPassword(auth, email, password);
            console.log(resp.user);
            alert('Login success')
            navigate('/list')
            sessionStorage.setItem('user', JSON.stringify(resp.user));
        } catch (e) {
            alert("Ko đăng nhập đc bạn ei, non")
            console.error(e);
        }
    }
    }
    const _goToSignup = () => {
        navigate('/')
    }

    return (
        <div className="container" id="container">
            <div className="width-fit w-3/4 mx-auto px-3 py-3">
                <div className="grid grid-cols-1">
                    <form action="" className="px-auto pt-6  bg-white rounded" onSubmit={formPrevent}>
                        <div className="">
                            <h1 className="font-bold text-2xl mb-7">Sign In</h1>
                            <hr className="border-1 border-solid border-slate-100" />
                            <label htmlFor="email" className="font-bold">Email</label>
                            <input type="text" className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none bg-gray-300 focus:outline-none focus:shadow-outline focus:text-black focus:bg-zinc-300" id="email"
                                onChange={(evt) => setEmail(evt.target.value)} placeholder="Email" value={email} />
                            <label htmlFor="password" className="font-bold">Password</label>
                            <input type="password" className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none bg-gray-300 focus:outline-none focus:shadow-outline focus:text-black focus:bg-zinc-300" id="password"
                                onChange={(evt) => setPassword(evt.target.value)} placeholder="Password" value={password} />
                            <div className="mt-5">
                                <button className="w-1/3 mx-auto px-4 py-2 font-bold text-white bg-green-500 rounded-full hover:bg-green-700 focus:outline-none focus:shadow-outline hover:translate-x-3"
                                    onClick={_doLogin}>Sign In</button>
                            </div>
                        </div>
                        <p className="font-bold italic">or</p>
                    </form>
                </div>
                <div className="">
                <button className="w-1/3 mx-auto px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline hover:translate-x-3"
                    onClick={_goToSignup}>Sign Up</button>
                </div>
                <p className="font-bold italic">if you don't have an account.</p>
            </div>
        </div>
    )
}
function formPrevent(e) {
    e.preventDefault();
}

export default Login