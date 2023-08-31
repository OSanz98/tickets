"use server"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

/**
 * these functions now run on the server and can be called like this from client components.
 * if you want to run function on server in server component, you can create function directly in server component.
 * and within the function in server component, put "use server" at the top of function body. 
 */
export async function addTicket(formData) {
    const ticket = Object.fromEntries(formData)

    const supabase = createServerActionClient({cookies})
    const {data: {session}} = await supabase.auth.getSession()

    // insert data
    const { error } = await supabase.from('Tickets').insert({
        ...ticket,
        user_email: session.user.email
    })

    if(error){
        throw new Error('Could not add the new ticket.')
    }

    // revalidatePath looks at a specific path and runs the fetch inside that path to refetch data 
    // in the background
    revalidatePath('/tickets')
    redirect('/tickets')
}

export async function deleteTicket(id) {
    const supabase = createServerActionClient({cookies})

    // delete data
    const { error } = await supabase.from('Tickets').delete().eq('id', id)

    if(error){
        throw new Error('Could not delete the ticket.')
    }

    // revalidatePath looks at a specific path and runs the fetch inside that path to refetch data 
    // in the background
    revalidatePath('/tickets')
    redirect('/tickets')

}