import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

const authUser = async (req) => {
    try {
        // const token = req.headers.get("token"); // Use 'Authorization' header in real apps
        const token = req.headers.get("authorization")?.split(" ")[1];
        if (!token) {
            return NextResponse.json(
                { success: false, message: "Not authorized. Please log in again." },
                { status: 401 }
            );
        }
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);

        console.log(token_decode.id, "from middleware");

        // Instead of modifying req, return the userID
        return { success: true, userID: token_decode.id };

    } catch (error) {
        return NextResponse.json(
            { success: false, message: `${error.message}` },
            { status: 500 }
        );
    }
};

export { authUser };
