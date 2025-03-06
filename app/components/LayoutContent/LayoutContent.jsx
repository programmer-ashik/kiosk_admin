import { ToastContainer } from "react-toastify"

const LayoutContent = ({ children }) => {
    return (
        <div className="relative max-w-7xl mx-auto px-4 md:px-8">
            {children}
            <ToastContainer />
        </div>
    )
}

export default LayoutContent