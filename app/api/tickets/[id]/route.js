import axios from "axios";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';


export async function GET(_, {params}) {
    const id = params.id

    const res = await axios.get(`http://localhost:4000/tickets/${id}`);
    const ticket= await res.data

    if(!res.ok) {
        return NextResponse.json({error: 'Cannot find the ticket'}, {
            status: 404
        })
    }

    // sends response as JSON - we can also pass params to specify options like as follows
    return NextResponse.json(ticket, {
        status: 200
    });
}

