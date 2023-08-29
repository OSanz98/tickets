"use client"
// ^ when using an interactive component we will need to hydrate it in the browser, so it needs to be
// a client component. All components in app folder are server by default.

import React, {useState} from 'react'
import { useRouter } from 'next/navigation'


export default function CreateForm() {
    const router = useRouter()


    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [priority, setPriority] = useState('low')
    const [isLoading, setIsLoading] = useState(false)


    const handleSubmit = async (e) => {
        // prevents form from refreshing the page (default action of form)
        e.preventDefault()
        setIsLoading(true)

        const ticket = {
            title, body, priority, user_email: 'tester@tester.com'
        }
        const res = await fetch('http://localhost:4000/tickets', {
            method: 'POST',
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(ticket)
        })

        if(res.status === 201) {
            // tells react router to refresh content in the background and pre-render page,
            // with updated content.
            router.refresh()
            router.push('/tickets')
        }
    }

    return (
        <form onSubmit={handleSubmit} className='w-1/2'>
            <label>
                <span>Title:</span>
                <input 
                    required 
                    type="text" 
                    name="title" 
                    onChange={(e) => setTitle(e.target.value)}
                    value={title} 
                />
            </label>
            <label>
                <span>Body:</span>
                <textarea 
                    required 
                    name="body" 
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                />
            </label>
            <label>
                <span>Priority:</span>
                <select 
                    name="priority"
                    onChange={(e) => setPriority(e.target.value)}
                    value={priority}
                >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
                </select>
            </label>
            <button className="btn-primary" disabled={isLoading}>
                {isLoading && <span>Adding...</span>}
                {!isLoading && <span>Add Ticket</span>}
            </button>
        </form>
    )
}