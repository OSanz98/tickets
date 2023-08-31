import React from 'react'
import { addTicket } from '../actions'
import SubmitButton from '@/app/components/SubmitButton'


export default function CreateForm() {



    // const handleSubmit = async (e) => {
    //     // prevents form from refreshing the page (default action of form)
    //     e.preventDefault()
    //     setIsLoading(true)

    //     const ticket = { title, body, priority }
    //     const res = await fetch('http://localhost:3000/api/tickets', {
    //         method: 'POST',
    //         headers: {"Content-Type":"application/json"},
    //         body: JSON.stringify(ticket)
    //     })

    //     const json = await res.json()

    //     if (json.error) {
    //         console.log(error.message);
    //     }
    //     if(json.data) {
    //         router.refresh()
    //         router.push('/tickets')
    //     }
    // }

    return (
        <form action={addTicket} className='w-1/2'>
            <label>
                <span>Title:</span>
                <input
                    required 
                    type="text" 
                    name="title"
                />
            </label>
            <label>
                <span>Body:</span>
                <textarea 
                    required 
                    name="body"
                />
            </label>
            <label>
                <span>Priority:</span>
                <select 
                    name="priority"
                >
                <option value="low">Low Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="high">High Priority</option>
                </select>
            </label>
            <SubmitButton />
            {/* <button className="btn-primary" disabled={isLoading}>
                {isLoading && <span>Adding...</span>}
                {!isLoading && <span>Add Ticket</span>}
            </button> */}
        </form>
    )
}