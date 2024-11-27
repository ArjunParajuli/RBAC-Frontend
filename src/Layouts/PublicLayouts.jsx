    import React, { useEffect } from 'react'
    import { useSelector } from 'react-redux'
    import { Outlet, useNavigate } from 'react-router-dom'
    export default function PublicLayouts() {
        const user=useSelector((state)=>state.Auth.user)
        const navigate=useNavigate()


        useEffect(()=>{
        if (user) {
                navigate('/');      // Redirect logged-in users to the general home page
        }
        },[user,navigate])
    return (
        <Outlet/>
    )
    }
