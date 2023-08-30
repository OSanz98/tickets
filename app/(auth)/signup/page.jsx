"use client"
import React, {useState} from 'react'
import AuthForm from '../AuthForm';
/**
 * Package used to connect to supabase project.
 * How Next works with Supabase, it uses a cookie to transfer authentication information between our application and
 * supabase. createClientComponentClient is a function to be used in the client application / browser. 
 * It can access that cookie directly from the browser.
 */
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation';

export default function SignUp() {
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e, email, password) => {
    e.preventDefault();

    // returns instance of supabase client object
    const supabase = createClientComponentClient()
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: `${location.origin}/api/auth/callback`,
      }
    })
    if(error) {
      setError(error.message)
    } 

    // if no error signing user up, redirect user to another page.
    if(!error) {
      router.push('/verify')
    }
  }

  return (
    <main>
        <h2 className="text-center">Sign Up</h2>
        <AuthForm handleSubmit={handleSubmit}/>
        {error && (
          <div className='error'>{error}</div>
        )}
    </main>
  )
}
