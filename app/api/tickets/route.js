import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import axios from "axios";
import { NextResponse } from "next/server";
// Normally if you were to fetch data from an api, you should do it in the server component instead.

/**
 * When making a route handler in next.js, just like with server components it can be static and dynamic. 
 * Static route handlers are cached by default at build time and during development.
 * Dynamic route handlers aren't cached by default, and run seperately when every request comes in for them.
 * Next always tries to statically build things in cache responses.
 * If it was static and we added an item to the database, when we next run the route handler it will not show the 
 * new item, unless we modify the next revalidate option to 0. This is because it keeps a cache result of the previous
 * request for future requests over certain period of time.
 * UPDATE: GET handlers are static by default, most other route handlers are dynamic - if you use request in GET method
 * then it will be dynamic. Any other HTTP methods are dynamic. Using dynamic functions like cookies and headers will
 * make it dynamic. 
 * Ususally you'd create this API folder structure for any client components - if you're trying to do any HTTP methods.
 * @returns NextResponse instance
 */

// this line enforces that all route handlers in this file are dynamic. Must be named dynamic.
export const dynamic = 'force-dynamic';


// export async function GET() {
//     const res = await axios.get('http://localhost:4000/tickets');
//     const tickets = await res.data

//     // sends response as JSON - we can also pass params to specify options like as follows
//     return NextResponse.json(tickets, {
//         status: 200
//     });
// }


// export async function POST(request) {
//     const ticket = await request.json()

//     const res = await fetch('http://localhost:4000/tickets', {
//         method: 'POST',
//         headers: {"Content-Type":"application/json"},
//         body: JSON.stringify(ticket)
//     })

//     const newTicket = await res.json()

//     return NextResponse.json(newTicket, {
//         status:201
//     })
// }

export async function POST(request){
    const ticket = await request.json();

    // get supabase instance
    const supabase = createRouteHandlerClient();

    // get current user session
    const {data: {session}} = await supabase.auth.getSession();

    // insert data into database - from is used to reach a database and get data from it or insert into
    // .single() ensures that we get it back as a single object and not array (which is default behavior)
    const { data, error } = await supabase.from('Tickets').insert({
        ...ticket,
        user_email: session.user.email
    }).select().single();

    return NextResponse.json({ data, error });
}