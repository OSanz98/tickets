import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import React from 'react'

/**
 * middleware is a function that can run on the server on every request immediately before any route gets loaded.
 * if user becomes idle, the user's cookie session will expire.
 * when user refreshes the page, the middleware will be called, and we can regrab the session calling getSession() - 
 * which refreshes that session and updates the cookie in time, before the request reaches the route handler.
 */

export default async function AuthLayout({children}) {
    const supabase = createServerComponentClient({ cookies })
    const { data } = await supabase.auth.getSession()

    // check used to redirect user to dashboard if they are signed in and try to access login page.
    if(data.session) {
        redirect('/')
    }

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
