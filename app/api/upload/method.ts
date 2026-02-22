
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function CloudinaryImage( image: string) {
    try {
        
        const uploaded = await cloudinary.uploader.upload(image, {
            folder: "nextjs_uploads",
        });

        return NextResponse.json({
            success: true,
            url: uploaded.secure_url,
        });

    } catch (error) {
        return NextResponse.json(
            { success: false, error },
            { status: 500 }
        );
    }
}