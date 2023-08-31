import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware(req) {
    // must return a response in next() for middleware functions - next() tells next.js to move on to whatever
    // request you called in the first place - like a page route.
    const res = NextResponse.next()
    const supabase = createMiddlewareClient({ req, res })
    // refreshes session if expired and updates cookie
    await supabase.auth.getSession()
    return res
}