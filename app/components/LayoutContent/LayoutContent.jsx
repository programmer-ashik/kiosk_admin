import AppContextProvider from "@/app/context/AppContext"
import { ToastContainer } from "react-toastify"

const LayoutContent = ({ children }) => {
    return (
        <div className="relative max-w-7xl mx-auto px-4 md:px-8">
            <AppContextProvider>
                {children}
                <ToastContainer />
            </AppContextProvider>
        </div>
    )
}

export default LayoutContent