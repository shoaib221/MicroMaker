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

			<div className="h-8" ></div>

			<h6 className="header-1" >About Us</h6>
			<div className="px-6 text-justify">
				Welcome to the future of professional collaboration. Our platform is designed to bridge the gap between specialized expertise and the businesses that need it most, creating a streamlined marketplace for the modern economy. In an era where agility is the ultimate competitive advantage, finding the right partner shouldn't be a weeks-long process of vetting and outreach. Whether you are a startup looking to scale your reach through cutting-edge marketing strategies, a legacy firm aiming to integrate AI services into your workflow, or an entrepreneur seeking airtight legal consultancy, our search-centric interface puts a world of talent at your fingertips.We believe that the right connection can transform a project from a concept into a success story. By leveraging an intuitive search engine, users can bypass the noise of traditional job boards and zero in on professionals who possess the exact technical nuances required for their specific task. Our platform categorizes a vast spectrum of high-value skills, ensuring that even the most niche requirements—from generative AI implementation to complex intellectual property law—are easily discoverable.Security and clarity are at the heart of our mission. We provide a space where transparency is the standard, allowing you to browse portfolios, compare service models, and initiate conversations with confidence. For service providers, it’s a stage to showcase their unique capabilities to a global audience. For seekers, it’s a powerful tool to build a dream team on demand. By simplifying the way we discover professional services, we aren't just building a directory; we are fostering a more efficient, collaborative, and innovation-driven professional landscape where the solution to your biggest challenge is just a search away.Would you like to focus on optimizing the search filters for these specific industries, or should we look at UI/UX design ideas to make the navigation more intuitive?
			</div>

			

			<br /><br/>
			<h6 className="header-1" >Search Tasks By Category</h6>
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
