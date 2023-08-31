"use client"
// ^ when using an interactive component we will need to hydrate it in the browser, so it needs to be
// a client component. All components in app folder are server by default.
import React from 'react'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'

export default function SubmitButton() {
    const {pending} = useFormStatus()
    return (
        <button className="btn-primary" disabled={pending}>
            {pending && <span>Submitting...</span>}
            {!pending && <span>Submit</span>}
        </button>
    )
}
