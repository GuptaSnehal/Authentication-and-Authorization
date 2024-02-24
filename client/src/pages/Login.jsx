import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


export default function Login(){

    const [data,setData] = useState({
        email: '',
        password: '',
     })

    const navigate = useNavigate();
    const loginUser = async (e) =>{
        e.preventDefault();
        // axios.get('/');
        const { email , password} = data;
        try {

            const{data} =  await axios.post('/login' , {email , password})
            if(data.error){
                toast.error(data.error)
            }
            else{
                setData({});
                toast.success('Login Successfull!');
                navigate('/dashboard');
            }
            
        } catch (error) {
            console.log(error);
        }
   }
    return(
        <div>
            <form onSubmit={loginUser}>
             <br /><br/ >
            <label>Email: </label>
            <input type = 'email' placeholder='Enter email' value={data.email} onChange= {(e)=> setData({...data , email : e.target.value})} />
            <br /><br/ >
            <label>Password: </label>
            <input type = 'password' placeholder='Enter password' value={data.password} onChange= {(e)=> setData({...data , password : e.target.value})}/>
            <br /><br/ >
            <button type = 'submit'>Login</button>
            </form>
        </div>
    )
}