import React from 'react'
import LoginForm from '../components/forms/LoginForm'

const Login = () => {
  return (
    <main className="py-12 md:py-20 px-4 min-h-[80vh] flex items-center">
      <div className="container mx-auto">
        <LoginForm />
      </div>
    </main>
  )
}

export default Login
