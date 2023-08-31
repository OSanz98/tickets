import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import axios from "axios";
import { NextResponse } from "next/server";
import {cookies} from 'next/headers'

// export const dynamic = 'force-dynamic';


// export async function GET(_, {params}) {
//     const id = params.id

//     const res = await axios.get(`http://localhost:4000/tickets/${id}`);
//     const ticket= await res.data

//     if(!res.ok) {
//         return NextResponse.json({error: 'Cannot find the ticket'}, {
//             status: 404
//         })
//     }

//     // sends response as JSON - we can also pass params to specify options like as follows
//     return NextResponse.json(ticket, {
//         status: 200
//     });
// }

export async function DELETE(_, { params }) {
    const id = params.id
    const supabase = createRouteHandlerClient({cookies})
    const { error } = await supabase.from('Tickets').delete().eq('id', id)
    return NextResponse.json({error})
}

