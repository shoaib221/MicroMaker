"use client";

import {  useState } from "react";
import { FaRegSmile } from "react-icons/fa";
import { GrUploadOption } from "react-icons/gr";
import axios from "axios";
import { uploadFile } from "./cloudinary-upload";



export const useMyImage = ({ url = "https://i.ibb.co.com/7tmkDpb6/Screenshot-2026-01-04-224203.png" }) => {

    
    const [photo, setPhoto] = useState(url);
    const [imageFile, setImageFile] = useState(null);

    function resetPhoto () {
        setImageFile(null);
        setPhoto( "https://i.ibb.co.com/7tmkDpb6/Screenshot-2026-01-04-224203.png" );
    }

    async function Upload() {
        try {
            if (!imageFile) {   
                return null;
            }
            const url = await uploadFile(imageFile);
            setPhoto(url);
            return url;
        } catch (error) {
            console.error("Image upload failed", error);
            return null;
        }
    }
    

    const imageChange = (event) => {
        let file = event.target.files[0];

        if (file) {
            setImageFile(file)
            let url = URL.createObjectURL(file)
            setPhoto(url)
        }
    }


    const Tag = () => {
        return (
            <div className="bg-cover bg-center h-60 w-full relative rounded-xl mb-4"
                style={{ backgroundImage: `url(${photo})` }} >

                { !photo && <div className="flex flex-col items-center justify-center h-full text-(--color1a) bg-black/30" >
                    <FaRegSmile className="text-5xl mb-2" />
                    <div>No Photo</div>
                </div> }

                <div className="absolute p-2 z-20 rounded-full -bottom-5 left-[40%] bg-(--color1) cursor-pointer" >
                    Upload Photo
                    <input type="file" onChange={imageChange} className="opacity-0 absolute cursor-pointer inset-0 h-full w-full" />
                </div>
            </div>
        )
    }



    return {  PhotoTag: Tag, uploadPhoto: Upload, resetPhoto }


}