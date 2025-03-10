"use client"
import axiosInstance from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const Login = () => {
  const [state, setState] = useState("Admin");
  const [email, setEmail] = useState("admin@kiosk.com")
  const [password, setPassword] = useState("admin@123#")

  const router = useRouter()
  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === "Admin") {
        const response = await axiosInstance.post("/api/admin", { email, password });

        if (response.data.success) {
          localStorage.setItem("aToken", response.data.token);
          toast.success("Login successful!");
          router.push('/admin')
        }
      }

    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        // Handle 401 Unauthorized error
        if (error.response.status === 401) {
          toast.error("Invalid email or password.");
        } else {
          toast.error(error.response.data.message || "An error occurred.");
        }
      } else {
        toast.error("Something went wrong.");
      }
    }
  }

  return (
    <form onSubmit={onSubmitHandler} className=" min-h-[80vh] flex items-center">
      <div className=" flex flex-col gap-3 m-auto items-center p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5e5e5e]">
        <p className=" text-2xl font-semibold mx-auto text-primary"><span>{state}</span> Login</p>
        <div className=" w-full">
          <p className=" mt-2 py-2 text-md font-medium text-gray-800">Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            required
            className="border border-[#dadada] rounded w-full p-2 mt-1"
          />
        </div>
        <div className=" w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            required
            className="border border-[#dadada] rounded w-full p-2 mt-1"
          />
        </div>
        <button className=" bg-primary hover:bg-blue-500 text-white w-full rounded-md py-2">Login</button>

      </div>
    </form>
  )
}

export default Login