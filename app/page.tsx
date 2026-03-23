import Image from "next/image";
import { Slide11 } from "@/library/slide/slide1";
import { Slide2, Slide21 } from "@/library/slide/slide2";
import { Grid1 } from "@/library/grid/grid1";



export default function Home() {
	return (
		<div className="items-center justify-center bg-(--color1) text-(--color2)" >
			
			
			<Slide11 />

			
			

			<br/>
			<h6  className="text-center text-4xl" >Find Jobs</h6>
			<Grid1 />

			<br/>

			<h6  className="text-center text-4xl" >Best Workers</h6>
			<Slide2   />

			<br/>
			<h6  className="text-center text-4xl" >User Feedback</h6>
			<Slide21  />

			<br/>
			<h6  className="text-center text-4xl" >Trusted By</h6>

			<br/>
			<h6  className="text-center text-4xl" >Accomplishments</h6>
			
			
		</div>
	);
}
