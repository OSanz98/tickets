"use client"
import React, {useState} from 'react'
import AuthForm from '../AuthForm'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';

export default function LogIn() {
  const [error, setError] = useState('')
  const router = useRouter()

  // For a reference: you can't pass a function from a server component to a client component.
  const handleSubmit = async (e, email, password) => {
    e.preventDefault()
    setError('')

    const supabase = createClientComponentClient()
    const {error} = await supabase.auth.signInWithPassword({
      email,
      password
    })
    if(error) {
      setError(error.message)
    }
    if (!error){
      router.push('/')
    }

  }

  return (
    <main>
        <h2 className="text-center">Log In</h2>
        <AuthForm handleSubmit={handleSubmit}/>
        {error && (
          <div className="error">{error}</div>
        )}
    </main>
  )
}
