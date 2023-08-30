import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Logo from './tickets-logo.png'
import LogoutButton from './LogoutButton'

export default function Navbar({user}) {
  return(
    <nav>
        <Image src={Logo} alt="Tickets logo" width={75} quality={100} placeholder='blur'/>
        <h1>Ticket Dashboard</h1>
        {/* Links are great and help speed things up because of the way they are designed.
        They have extra functionality, like intercept a request to the server, 
        and handling the routing on the front-end it prefects that page in the background, 
        so when we click on that link, it already has the page ready to show. */}
        <Link href="/">Dashboard</Link>
        {/* mr-auto tells everything that follows it to be on the right - in context of using flex components */}
        <Link href="/tickets" className='mr-auto'>Tickets</Link>
        {user && (
          <span>Hello, {user.email}</span>
        )}
        <LogoutButton />
    </nav>
  )
}
