import React, { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { MdEditSquare } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

import { MdDelete } from "react-icons/md";

const Manager = () => {
    const ref = useRef()
    const passwordRef = useRef()
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])
    useEffect(() => {
        let passwords = localStorage.getItem("password")

        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])
    const copyText = (text) => {
        toast('Copy to clipboard!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        navigator.clipboard.writeText(text)
    }

    const savePassword = () => {
        if(form.site.length>3 && form.username.length>3 && form.password.length>3 ){

            toast('Password saved !', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            setPasswordArray([...passwordArray, {...form, id: uuidv4()}])
            setForm({ site: "", username: "", password: "" })
            localStorage.setItem("password", JSON.stringify([...passwordArray, {...form, id: uuidv4()}]))
            console.log([...passwordArray, form])
        }
        else{
              toast('Password not saved !', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    }
    const deletePassword = (id) => {
        toast('Password deleted!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
        console.log("Deleting password by id",id)
        let c =confirm("Do you want delete password")
        if(c){
            setPasswordArray(passwordArray.filter(item=>item.id!==id))
            localStorage.setItem("password", JSON.stringify(passwordArray.filter(item=>item.id!==id)))
        }
    }
    const editPassword = (id) => {
        console.log("Editing password by id",id)
        setForm(passwordArray.filter(i=>i.id===id)[0])
        setPasswordArray(passwordArray.filter(item=>item.id!==id))
    }
    const showPassword = () => {
        passwordRef.current.type = "password"
        if (ref.current.src.includes("icons/eyecross.jpg")) {
            ref.current.src = "icons/eye.jpg"
            passwordRef.current.type = "password"
        }
        else {
            ref.current.src = "icons/eyecross.jpg"
            passwordRef.current.type = "text"
        }
    }
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition="Bounce"
            />
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size:14px_24px"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-77.5 w-77.5 rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>
            <div className="p-2 md:p-0 md:mycontainer  ">
                <h1 className='text-4xl font-bold text-center'>
                    <span className='text-green-500'>&lt;</span>
                    <span>Pass</span>
                    <span className='text-green-500'>OP/&gt;</span></h1>
                <p className='text-green-900 text-lg text-center'>Your own password manager</p>
                <div className=' flex flex-col p-4 text-black gap-6 items-center'>
                    <input value={form.site} name='site' id='site' onChange={handleChange} placeholder='Ente website URL' className='bg-white rounded-full border border-green-700 w-full px-4 py-1' type="text" />
                    <div className="flex md:flex-row flex-col w-full gap-8 justify-between">
                        <input value={form.username} name='username' id='username' onChange={handleChange} placeholder='Enter Username' className='bg-white rounded-full border border-green-700 w-full px-4 py-1 ' type="text" />
                        <div className="relative">
                            <input ref={passwordRef} value={form.password} id='password' name='password' onChange={handleChange} placeholder='Enter Password' className='bg-white rounded-full border border-green-700 w-full px-4 py-1 ' type="password" />
                            <span className='absolute right-0.75 top-1.25 cursor-pointer' onClick={showPassword}>
                                <img ref={ref} className='rounded-full p-1' width={26} src="icons/eye.jpg" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className='flex gap-2 justify-center items-center bg-green-400 py-2 w-fit hover:bg-green-300 rounded-full px-8 border-2 border-green-900'>
                        <lord-icon
                            src="https://cdn.lordicon.com/efxgwrkc.json"
                            trigger="hover">
                        </lord-icon>
                        Save </button>
                </div>
                <div className="passwords">
                    <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div> No passwords to show</div>}
                    {passwordArray.length != 0 && <table className="mb-10 table-auto w-full rounded-md overflow-hidden">
                        <thead className=' bg-green-800 text-white'>
                            <tr>
                                <th className='py-2'>Site</th>
                                <th className='py-2'>Username</th>
                                <th className='py-2'>Password</th>
                                <th className='py-2'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-100'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index} >

                                    <td className='py-2 border border-white text-center w-xl '>
                                        <div className="flex gap-2 justify-center">
                                            <a href={item.site} target='_blank'> {item.site}</a>
                                            <div className='flex justify-center items-center'><img onClick={() => { copyText(item.site) }} className='cursor-pointer ' src="/icons/copy.svg" alt="" /></div>
                                        </div>
                                    </td>

                                    <td className='py-2 border border-white text-center w-32  '>
                                        <div className="flex gap-2 justify-center">
                                            {item.username}
                                            <div className='flex justify-center items-center'><img onClick={() => { copyText(item.username) }} className='cursor-pointer ' src="/icons/copy.svg" alt="" /></div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center w-32 '>
                                        <div className="flex gap-2 justify-center">{item.password}
                                            <div className='flex justify-center items-center'><img onClick={() => { copyText(item.password) }} className='cursor-pointer ' src="/icons/copy.svg" alt="" /></div>
                                        </div>
                                    </td>
                                    <td className='py-2 border border-white text-center w-32 '>
                                        <div className="flex justify-center items-center gap-3">
                                            <span className='text-2xl cursor-pointer' onClick={()=>{editPassword(item.id)}} ><MdEditSquare /></span>
                                            <span className='text-2xl cursor-pointer' onClick={()=>{deletePassword(item.id)}} ><MdDelete /></span>
                                        </div>
                                    </td>

                                </tr>
                            })}

                        </tbody>
                    </table>}
                </div>
            </div>
        </>
    )
}

export default Manager
