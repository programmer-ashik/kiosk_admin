"use client"
import { useRouter } from "next/navigation"
import { useContext } from "react"
import { toast } from "react-toastify"
import AdminForm from "../components/Admin"
import { AppContext } from "../context/AppContext"


const Admin = () => {
    const { setAtoken } = useContext(AppContext)
    const router = useRouter()
    const logout = () => {
        if (typeof window !== "undefined") {
            localStorage.removeItem("aToken");
            router.push('/')
            toast.success("Admin Log Out")
        }
    }


    return (
        <div className=" bg-slate-50 max-w-7xl mx-0 py-4">
            <div className="w-full flex justify-end items-center h-12 rounded-md">
                <button onClick={logout}
                    className="px-4 py-2 border-2 border-black rounded-md">Log Out</button>
            </div>
            <AdminForm />
        </div>
    )
}

export default Admin