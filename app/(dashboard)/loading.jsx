import React from 'react'

// this function allows us to render a loading state on the website when invoked. 
// helps to keep a clean interface, letting user know that something is loading.
export default function Loading() {
  return (
    <main className='text-center'>
        <h2 className='text-primary'>Loading...</h2>
        <p>Hopefully not for too long:)</p>
    </main>
  )
}
