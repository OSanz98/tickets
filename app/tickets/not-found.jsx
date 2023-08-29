// This file will override the one made in the root folder.
import React from 'react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className='text-center'>
        <h2 className='text-3xl'>There seems to be an issue.</h2>
        <p>We couldn't find the ticket you were looking for</p>
        <p>Go back to all <Link href="/tickets">tickets</Link></p>
    </main>
  )
}
