"use client"
import React from 'react'
import AuthForm from '../AuthForm'

export default function LogIn() {

  // For a reference: you can't pass a function from a server component to a client component.
  const handleSubmit = async (e, email, password) => {
    e.preventDefault();

  }

  return (
    <main>
        <h2 className="text-center">Log In</h2>
        <AuthForm handleSubmit={handleSubmit}/>
    </main>
  )
}
