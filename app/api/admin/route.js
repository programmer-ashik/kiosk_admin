import jwt from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export async function POST(req) {
    try {
        // Extract email and password from the request body
        const { email, password } = await req.json();

        // Check if the email and password match the admin credentials
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            // Generate a JWT token
            const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

            // Return success response with the token
            return NextResponse.json(
                { success: true, token },
                { status: 200 }
            );
        }
        // Return error response for invalid credentials
        return NextResponse.json(
            { success: false, message: 'Invalid credentials' },
            { status: 401 }
        );

    } catch (error) {
        console.error('Server error:', error);
        return NextResponse.json(
            { success: false, message: 'Something went wrong' },
            { status: 500 }
        );
    }
}