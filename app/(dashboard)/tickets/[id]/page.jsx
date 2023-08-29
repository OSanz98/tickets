import React from 'react'
import { notFound } from 'next/navigation'
// import axios from 'axios'

// this tells next.js to return a 404 page if something can't be pre-rendered
// export const dynamicParams = false
// if set to true then if ticket page hasn't been made for it, next.js will try to create a page for it incase it doesn't exist
// once it's done that it can create a static page for future requests to that ticket.
export const dynamicParams = true

/**
 * this function is used by next.js so it knows in advance all the pages and routes 
 * it needs to make. It ensures all the pages are pre-rendered and in doing so make 
 * it quicker to load. If you want to do this and use next revalidate, make sure it's not set
 * to 0.
*/
export async function generateStaticParams() {
    const res = await fetch('http://localhost:4000/tickets')
    const tickets = await res.json()
    return tickets.map((ticket) => ({
        id: ticket.id
    }))
}

export async function generateMetadata({ params }){
    const id = params.id
    const res = await fetch(`http://localhost:4000/tickets/${id}`)
    const ticket = await res.json()

    return {
        title: `Ticket Dashboard | ${ticket.title}`
    }
}

async function getTicket(id) {
    await new Promise(resolve => setTimeout(resolve, 3000))
    
    const res = await fetch('http://localhost:4000/tickets/' + id, {
        next: {
            revalidate: 60
        }
    })

    if(!res.ok) {
        notFound()
    }

    return res.json()
}

export default async function TicketDetails({ params }) {
    const ticket = await getTicket(params.id)

    return (
        <main>
            <nav>
                <h2>Ticket Details</h2>
            </nav>
            <div className='card'>
                <h3>{ticket.title}</h3>
                <small>Created by {ticket.user_email}</small>
                <div className={`pill ${ticket.priority}`}>
                    {ticket.priority} priority
                </div>
                <p>{ticket.body}</p>
            </div>
        </main>
    )
}
