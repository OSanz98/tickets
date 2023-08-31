import React, { Suspense } from 'react'
import TicketsList from './TicketsList'
import Loading from '../loading'
import Link from 'next/link'
import {FaPlus} from 'react-icons/fa'
/**
 * By default, components are server components (static content),
 * if we want to add interactivity to a component, then we need to specify it as a client component
 * this helps make the website quicker, because server components won't need extra javascript to 
 * be rendered/hydrated. Whereas client components do.
*/
export default function Tickets() {
  return (
    <main>
        <nav>
          <div>
            <h2>Tickets</h2>
            <p><small>Currently open tickets</small></p>
          </div>
          <Link href='/tickets/create' className='ml-auto'>
            <FaPlus />
            <button className="btn-primary">New Ticket</button>
          </Link>
        </nav>


        {/* Using suspense allows the rest of the content on this page to be rendered and shown
        whilst waiting for the components inside tickets to be rendered */}
        <Suspense fallback={<Loading />}>
          <TicketsList />
        </Suspense>

    </main>
  )
}
