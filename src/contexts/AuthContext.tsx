// 'use client'
// import { supabase } from '@/lib/supabase/server'
// import { createContext, useContext, useEffect, useState } from 'react'


// const AuthContext = createContext()

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(null)
//     const [loading, setLoading] = useState(true)

//     useEffect(() => {
//         const session = supabase.auth.getSession()

//         setUser(session?.user ?? null)
//         setLoading(false)

//         const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
//             setUser(session?.user ?? null)
//             setLoading(false)
//         })

//         return () => {
//             authListener?.unsubscribe()
//         }
//     }, [])

//     const login = async (email, password) => {
//         const { data, error } = await supabase.auth.signInWithPassword({
//             email,
//             password,
//         })
//         return { data, error }
//     }

//     const logout = async () => {
//         await supabase.auth.signOut()
//     }

//     return (
//         <AuthContext.Provider value={{ user, loading, login, logout }}>
//             {children}
//         </AuthContext.Provider>
//     )
// }

// export const useAuth = () => useContext(AuthContext)