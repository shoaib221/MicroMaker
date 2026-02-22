
import axios from "axios";

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

