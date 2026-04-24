"use client"

import { useEffect, useState } from "react";
import { useAuthContext } from "@/library/auth/context";
import axios from "axios";
import { Transaction, User } from "@/prisma/generated/client";
import { Loading } from "@/library/miscel/loading";


type TransactionWithSender = Transaction & {
    sender: User;
}



function UserCard({ user, onDelete }: { user: User, onDelete: (userId: string) => void }) {
    const [role, setRole] = useState(user.role);

    async function handleDelete() {
        try {
            await axios.delete(`/api/user/${user.id}`);
            //alert('successfully deleted')
            onDelete(user.id);
        } catch (err) {
            console.error("Error deleting user:", err);
        }
    }

    async function handleUpdate() {
        try {
            let res = await axios.put(`/api/user/${user.id}`, { role });
            //alert('successfully updated')
        } catch (err) {
            console.error("Error updating user:", err);
        }
    }

    return (
        <div key={user.id} className="shadow1 rounded-lg gap-4 p-2 mb-2 flex flex-col lg:flex-row justify-between" >
            <div>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                
                <p>Role:
                    <select value={role} onChange={(e) => setRole(e.target.value)} >
                        <option value="worker">Worker</option>
                        <option value="admin">Admin</option>
                        <option value="buyer">Buyer</option>
                    </select>
                </p>
            </div>

            <div className="flex flex-row lg:flex-col  gap-2" >
                {/* Action buttons like Edit, Delete can be added here */}
                <button onClick={handleUpdate} className="button-2" >Update</button>
                <button onClick={handleDelete} className="bg-(--color6) text-white px-2 py-1 rounded-lg hover:opacity-70" >Delete</button>
            </div>

        </div>
    );
}


export function ManageUsers() {
    const { myProfile } = useAuthContext()
    const [users, setUsers] = useState<User[]>([]);
    const [page, setPage] = useState(1);
    const [pages, setPages] = useState(1)
    const [loading, setLoading] = useState(true)
    const [userType, setuserType] = useState("")
    const limit = 10;

    async function FetchUsers() {
        try {
            let res = await axios.get(`/api/user?page=${page}&limit=${limit}&userType=${userType}`);
            setUsers(res.data.data);
            setPages(res.data.pages);
        } catch (err) {
            console.error("Error fetching users:", err);
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (!myProfile || myProfile.role !== "admin") return;



        FetchUsers();

    }, [myProfile?.role, page, userType])

    function handleDelete(userId: string) {
        // Implement user deletion logic here
        // After successful deletion, update the users state to remove the deleted user
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    }


    const PageTag = () => {

        if (loading) return <Loading />

        if (users && users.length > 0) return (
            <div className="flex gap-4 mx-auto justify-center items-center my-4" >
                {page > 1 && <div className={`button-2`}
                    onClick={() => setPage(page - 1)} >
                    Previous
                </div>}



                {[...Array(pages).keys()].map((__, _) => (
                    <div key={_} className={`${page === _ + 1 && 'button-2'} hover:opacity-70 font-bold px-2 cursor-pointer`} onClick={() => setPage(_ + 1)} >
                        {_ + 1}
                    </div>
                ))}

                {page < pages && <div className={`button-2`}
                    onClick={() => setPage(page + 1)} >
                    Next
                </div>}
            </div>
        )

        return (
            <div className="font-bold text-(--color3)" >Not Data Found</div>
        )
    }


    return (
        <div className="grow" >

            <div className="flex justify-center items-center" >
                <select value={userType} onChange={(e) => setuserType(e.target.value)}
                    className="bg-(--color3) text-(--color1) mx-auto my-4 p-2 rounded-xl">
                    <option value={""} >Select User Type</option>
                    <option value={"admin"} >Admin</option>
                    <option value={"buyer"} >Buyer</option>
                    <option value={"worker"} >Worker</option>
                </select>
            </div>

            <div className="flex flex-col gap-4 p-4" >
                {users && users.length > 0 && users.map(user => <UserCard key={user.id} user={user} onDelete={() => handleDelete(user.id)} />)}
            </div>

            <PageTag />
        </div>
    );
}