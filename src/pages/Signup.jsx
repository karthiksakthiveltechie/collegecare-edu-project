import React from 'react'
import SignupForm from '../components/forms/SignupForm'

const Signup = () => {
  return (
    <main className="py-12 md:py-20 px-4 min-h-[80vh] flex items-center">
      <div className="container mx-auto">
        <SignupForm />
      </div>
    </main>
  )
}

export default Signup
