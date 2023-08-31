import React from 'react'
import { notFound } from 'next/navigation'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import DeleteButton from './DeleteButton'
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
 * This can only really be used when fetching data from local hosting data. When using authentication and cookies
 * you shouldn't use this as we can't really create static pages from data hosted on the server.
*/
// export async function generateStaticParams() {
//     const res = await fetch('http://localhost:4000/tickets')
//     const tickets = await res.json()
//     return tickets.map((ticket) => ({
//         id: ticket.id
//     }))
// }

export async function generateMetadata({ params }){
    // const id = params.id
    // const res = await fetch(`http://localhost:4000/tickets/${id}`)
    // const ticket = await res.json()
    const supabase = createServerComponentClient({ cookies })

    // eq() used to grab the document where the id matches the ticket id specified in params
    // data: ticket returns the scope of data as ticket object
    const { data: ticket } = await supabase.from('Tickets').select().eq('id', params.id).single()

    return {
        title: `Ticket Dashboard | ${ticket?.title || 'Ticket not found'}`
    }
}

async function getTicket(id) {
    // await new Promise(resolve => setTimeout(resolve, 3000))
    
    // const res = await fetch('http://localhost:4000/tickets/' + id, {
    //     next: {
    //         revalidate: 60
    //     }
    // })
    const supabase = createServerComponentClient({ cookies })
    const { data } = await supabase.from('Tickets').select().eq('id', id).single()

    if(!data) {
        notFound()
    }

    return data
}

export default async function TicketDetails({ params }) {
    const ticket = await getTicket(params.id)
    const supabase = createServerComponentClient({cookies})
    const {data} = await supabase.auth.getSession()

    return (
        <main>
            <nav>
                <h2>Ticket Details</h2>
                <div className="ml-auto">
                    {data.session.user.email === ticket.user_email && (
                        <DeleteButton id={ticket.id} />
                    )}
                </div>
            </nav>
            <div className='card'>
                <h3>{ticket.title}</h3>
                <small>Created by {ticket.user_email}</small>
                <p>{ticket.body}</p>
                <div className={`pill ${ticket.priority}`}>
                    {ticket.priority} priority
                </div>
            </div>
        </main>
    )
}
