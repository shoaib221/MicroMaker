import Image from "next/image";
import { Slide11 } from "@/library/slide/slide1";
import { Slide2 } from "@/library/slide/slide2";



export default function Home() {
	return (
		<div className="items-center justify-center bg-(--color1) text-(--color2)" >
			
				
				<Slide11 />

				<h6  className="text-center text-6xl" >Available Jobs</h6>
				<Slide2   />
				
			
		</div>
	);
}
