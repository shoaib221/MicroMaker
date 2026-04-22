
import axios from "axios";


// backend upload
export async function uploadFile(file: File) {
    try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await axios.post("/api/upload/file", formData);
        return res.data.url;
    } catch (error) {
        console.error("Upload failed", error);
        throw error;
    }
}


// signed upload
export async function uploadToCloudinary(file: File) {
    try {
        // 1️⃣ Get signature from backend
        const res = await axios.get("/api/upload/signed" );

        

        const { timestamp, signature, apiKey, cloudName, folder } = res.data;

        //alert(signature + 'signature')

        // 2️⃣ Prepare upload
        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", apiKey);
        formData.append("timestamp", timestamp.toString());
        formData.append("signature", signature);
        formData.append("folder", folder);

        // 3️⃣ Upload directly to Cloudinary
        const uploadRes = await axios.post( `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
            formData
        );

        

        return uploadRes.data.secure_url;

    } catch (error) {
        console.error("Upload failed:", error);
        return null;
    }
}

