import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

export const GET = async () => {
    try {
        const jsonFilePath = path.join(process.cwd(), "public", "uploads", "sliderData.json");

        if (!fs.existsSync(jsonFilePath)) {
            return NextResponse.json(
                { success: false, message: "Slider data not found" },
                { status: 404, headers: { "Access-Control-Allow-Origin": "*" } }
            );
        }

        const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
        const sliderData = JSON.parse(jsonData);

        return new Response(JSON.stringify({ success: true, data: sliderData }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*", // Allow all origins
                "Access-Control-Allow-Methods": "GET",
                "Access-Control-Allow-Headers": "Content-Type",
            },
        });
    } catch (error) {
        console.error("Error fetching slider data:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
};
