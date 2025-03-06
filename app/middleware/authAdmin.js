import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

const authAdmin = async (req) => {
    try {
        const atoken = req.headers.get("atoken");
        console.log("Access Token:", atoken);
        if (!atoken) {
            return NextResponse.json(
                { success: false, message: "Not authorized. Please log in again." },
                { status: 401 }
            );
        }
        const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);
        if (token_decode.email !== process.env.ADMIN_EMAIL) {
            return NextResponse.json(
                { success: false, message: "Not authorized. Please log in again." },
                { status: 403 }
            );
        }
        return null;

    } catch (error) {
        return NextResponse.json(
            { success: false, message: `${error.message}` },
            { status: 500 }
        );
    }
};

export { authAdmin };
