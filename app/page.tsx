import Image from "next/image";
import { Slide11 } from "@/library/slide/slide1";
import { Slide2, Slide20, Slide21 } from "@/library/slide/slide2";
import { Grid1 } from "@/library/grid/grid1";
import { Grid2 } from "@/library/grid/grid2";
import { Loading } from "@/library/miscel/loading";



export default function Home() {
	return (
		<div className="items-center justify-center bg-(--color1) text-(--color2)" >

			<Slide11 />

			

			<br /><br/>
			<h6 className="header-1" >Find Jobs</h6>
			<Grid1 />

			<br /><br /><br/>

			<h6 className="header-1" >Accomplishments</h6>
			<Grid2 />

			<br /> <br /><br/>

			<h6 className="header-1" >Top Workers</h6>
			<br/>
			<Slide2 />

			<br /><br /><br/>

			<h6 className="header-1" >User Feedback</h6>
			<Slide21 />

			<br /><br />

			<h6 className="header-1" >Trusted By</h6>

			<Slide20 />

			<br />



		</div>
	);
}
