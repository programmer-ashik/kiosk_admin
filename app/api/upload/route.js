import fs from "fs";
import { NextResponse } from "next/server";
import path from "path";

export const POST = async (req) => {
    try {
        const formData = await req.formData();

        // Ensure the upload directory exists
        const uploadDir = path.join(process.cwd(), "public", "uploads");
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }

        // Path to the JSON file
        const jsonFilePath = path.join(uploadDir, "sliderData.json");

        // Default slider data
        let sliderData = {
            title: "Welcome to Bangladesh Coast Guard",
            image: "/imageIcon.jpg",
            headerImage: {
                bdFlag: "/imageIcon.jpg",
                cglogo: "/imageIcon.jpg",
                cgFlag: "/imageIcon.jpg",
            },
            sliderImages: [],
            video: "",
        };

        // Read the existing JSON file
        if (fs.existsSync(jsonFilePath)) {
            const jsonData = fs.readFileSync(jsonFilePath, "utf-8");
            sliderData = JSON.parse(jsonData);
        }

        // Helper function to delete old files
        const deleteOldFile = (oldFilePath) => {
            if (oldFilePath && oldFilePath !== "/imageIcon.jpg") { // Ensure it's not the default image
                const fullPath = path.join(process.cwd(), "public", oldFilePath);
                if (fs.existsSync(fullPath)) {
                    fs.unlinkSync(fullPath);
                }
            }
        };

        // Save files to the public/uploads folder and update JSON
        for (const [key, value] of formData.entries()) {
            if (value instanceof File) {
                const arrayBuffer = await value.arrayBuffer();
                const buffer = Buffer.from(arrayBuffer);

                // Generate a unique filename
                const timestamp = Date.now();
                const fileExtension = value.name.split(".").pop();
                const fileName = `${timestamp}.${fileExtension}`;
                const filePath = path.join(uploadDir, fileName);

                // Save the new file
                fs.writeFileSync(filePath, buffer);

                // Update JSON and delete old file
                const publicFilePath = `/uploads/${fileName}`;

                if (key.startsWith("headerImage")) {
                    const headerImageKey = key.replace("headerImage[", "").replace("]", "");
                    deleteOldFile(sliderData.headerImage[headerImageKey]); // Delete old file
                    sliderData.headerImage[headerImageKey] = publicFilePath;
                } else if (key.startsWith("sliderImages")) {
                    const sliderIndex = key.match(/\d+/)?.[0];
                    if (sliderIndex !== undefined) {
                        deleteOldFile(sliderData.sliderImages[sliderIndex]); // Delete old file
                        sliderData.sliderImages[sliderIndex] = publicFilePath;
                    } else {
                        sliderData.sliderImages.push(publicFilePath);
                    }
                } else if (key === "video") {
                    deleteOldFile(sliderData.video); // Delete old video
                    sliderData.video = publicFilePath;
                } else if (key === "image") {
                    deleteOldFile(sliderData.image); // Delete old image
                    sliderData.image = publicFilePath;
                }
            } else if (key === "title") {
                sliderData.title = value;
            }
        }

        // Save the updated JSON data
        fs.writeFileSync(jsonFilePath, JSON.stringify(sliderData, null, 2));

        return NextResponse.json(
            { success: true, message: "Files uploaded successfully", data: sliderData },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error uploading files:", error);
        return NextResponse.json(
            { success: false, message: "Internal Server Error" },
            { status: 500 }
        );
    }
};
