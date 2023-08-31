"use client"
// Error pages are client components
import React from 'react'

/**
 * reset is a function that next.js gives us to reset the error and show the 
 * original page content before the error occured 
 * */ 
export default function error({error, reset}) {
  return (
    <main className="text-center">
        <h2 className="text-4xl">Oh No!</h2>
        <p>{error.message}</p>
        <button
            onClick={reset}
            className='btn-primary mx-auto my-4'
        >
            Please try again.
        </button>
    </main>
  )
}
