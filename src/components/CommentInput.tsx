"use client"
import React, { useState } from 'react'
import { client } from '@/sanity/client'

function CommentInput({ blogId, isCreating, setIsCreating }: { blogId: string, isCreating: boolean, setIsCreating: (resp: boolean) => void}) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        comment: ""
    })
    const handleFormDetails = () => {
        if (!form.name || !form.email || !form.comment) {
            alert("Please fill complete form!")
            return
        }
        setIsCreating(true)
        client.mutate([
            {
                create: {
                    _type: "comment",
                    blogId: blogId,
                    name: form.name,
                    email: form.email,
                    comment: form.comment.trim(),
                    publishedAt: new Date().toISOString()
                }
            }
        ]).then(async (res) => {
            console.log(res)
            console.log(`Document created with ID: ${res}`);
            setForm({
                name: "",
                email: "",
                comment: ""
            })
        }).catch((err) => {
            console.error('Insert failed:', err.message);
        }).finally(()=>{
            setIsCreating(false)
        });

    }
    return (
        <div className='px-4 md:w-[75%] mx-auto py-4'>
            <h1 className='font-bold text-lg'>Comment Here</h1>
            <div className='flex mt-1 mb-3 justify-between'>
                <input type="text" placeholder='Enter Your Name' value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className='border border-gray-600 p-1 w-[49.5%]' required />
                <input type="email" placeholder='Enter Your Email' value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className='border border-gray-600 p-1 w-[49.5%]' required />
            </div>
            <textarea name="" id="" rows={5} value={form.comment} onChange={(e) => setForm({ ...form, comment: e.target.value })} placeholder='Write Comment' className='border border-gray-600 w-full' required></textarea>
            <button onClick={handleFormDetails} className='bg-gray-800 py-2 px-3 rounded-lg text-white'>Submit</button>
            {
                isCreating && (
                    <div className='fixed bottom-10 right-10 border border-black z-10 bg-black rounded-lg'>
                        <p className='text-white p-2'>Creating...</p>
                    </div>
                )
            }
        </div>
    )
}

export default CommentInput