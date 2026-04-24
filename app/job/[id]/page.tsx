"use client"


import { useAuthContext } from "@/library/auth/context";
import { DateDisplay } from "@/library/miscel/date";
import { Loading } from "@/library/miscel/loading";
import { Job } from "@/prisma/generated/browser";
import { JobCategory } from "@/prisma/generated/client";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";


type JobWithEmployer = Job & {
    employer: {
        name: string;
    };
} & {
    category: JobCategory
};


export default function Page() {
    const id = useParams().id;
    const [job, setJob] = useState<JobWithEmployer | null>(null);
    const [credential, setCredential] = useState<string>("");
    const { myProfile } = useAuthContext()

    useEffect(() => {
        if (!id) return;

        async function fetchData() {
            try {
                console.log("Fetching job data for ID:", id);
                //alert("Fetching job data for ID: " + id);
                const response = await axios.get(`/api/job/${id}`);
                setJob(response.data.job);
                console.log(response);
            } catch (error) {
                console.error("Error fetching job data:", error);
            }
        }

        fetchData();

    }, [id]);

    async function handleSubmit() {
        try {
            const response = await axios.post(`/api/job/submit`, {
                jobId: id,
                credential
            });

            alert("Submission successful!");
            setCredential("");
            
        } catch (error) {
            console.error("Error submitting credentials:", error);
            alert("Submission failed. Please try again.");
        }
    }


    if (job) return (
        <div className="flex flex-col gap-4 lg:flex-row p-4" >
            <div style={{ backgroundImage: `url(${ job.imageUrl })` }} className="mx-auto lg:mx-0 rounded-lg lg:sticky top-0 bg-cover bg-center w-[80vw] h-[80vw] lg:w-[40vw] lg:h-[40vw]" >
            </div>

            <div className="grow" >
                <h1 className="text-4xl font-bold text-(--color3)" >{job.title}</h1>
                
                <div>By {" "}
                    <span className="font-bold text-(--color3)" >{job.employer.name}</span>
                </div>

                <div>

                    Category:
                    <span className="font-bold text-(--color3)" > {job.category.name}</span>
                </div>

                <br/>

                <div className="text-xl font-bold text-(--color3)" >Description</div>
                <p>{job.description}</p>
                <br/>

                <p className="text-xl font-bold text-(--color3)" >Salary</p>
                <p  >{job.salary} coins per task</p>
                <br/>


                <div className="text-xl font-bold text-(--color3)" >What To Submit</div>
                <p>{job.submission_info}</p>

                <br/>
                <div className="text-xl font-bold text-(--color3)" >Deadline</div>
                <DateDisplay date={new Date(job.deadline)} />
                
                <br/><br/>
                <div className="text-xl font-bold text-(--color3)" >Required Employees</div>
                <p  >{job.required_employees} persons</p>

                <br/>

                { myProfile?.role === 'worker' && <> <div className="text-xl font-bold text-(--color3)" >
                    Submit Your Credentials
                </div>

                <textarea placeholder="Provide Your Submission Credentials" rows={8}  className="w-full input1" value={credential} onChange={ (e) => setCredential( e.target.value ) }  >

                </textarea>
                
                <br/><br/>

                <button className="button-2" onClick={() => handleSubmit() } >Submit</button>

                </>}

            </div>
        </div>
    );

    return <Loading />;
}


// model Job {
//   id          String  @id @default(cuid())
//   title       String
//   description String?
//   status      String  @default("pending")
//   salary      Int
//   employerId  String
//   employer    User    @relation("employer", fields: [employerId], references: [id], onDelete: Cascade)
//   employees          User[]   @relation("JobAsEmployee")
//   required_employees Int      @default(1)
//   deadline           DateTime
//   submission_info    String?
//   imageUrl           String?
// }

