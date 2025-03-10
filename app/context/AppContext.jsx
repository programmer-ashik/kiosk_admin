"use client"
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {

    const [aToken, setAtoken] = useState("");
    const router = useRouter()
    useEffect(() => {
        if (typeof window !== "undefined") {
            setAtoken(localStorage.getItem("aToken") || "");
        }
    }, []);

    const currencySymbol = "$"
    const value = {
        aToken,
        setAtoken,
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppContextProvider;