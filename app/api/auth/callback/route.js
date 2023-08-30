import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from 'next/headers'
import { NextResponse } from "next/server"

// the reason why the user session is to be stored in cookies is because when we are connecting to supabase it's
// done through server component, which runs on the server, so there isn't local storage. Supabase usually uses
// auth token stored in local storage, but for scenarios like this we won't be able to access it. Using cookies,
// server functions can access the cookie and get user session data. This is because the browser will automatically
// send any data in cookie to the server for any request.
// here this is a server function in API folder. hence using createRouteHandlerClient instead
export async function GET(request) {
    const url = new URL(request.url)
    const code = url.searchParams.get('code')

    if(code) {
        const supabase = createRouteHandlerClient({cookies})
        await supabase.auth.exchangeCodeForSession(code)

    }

    return NextResponse.redirect(url.origin)
}