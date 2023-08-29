

import Link from 'next/link'
import React from 'react'

export default function AuthLayout({children}) {
    return (
        <>
            <nav>
                <h1>Ticket Dashboard</h1>
                <Link href='/signup'>Sign up</Link>
                <Link href='/login'>Login</Link>
            </nav>
            {children}
        </>
    )
}
