"use client"

import { useEffect, useState } from "react";
import { useAuthContext } from "@/library/auth/context";
import axios from "axios";
import { Transaction, User } from "@/prisma/generated/client";


type TransactionWithSender = Transaction & {
    sender: User;
}



function UserCard( { user, onDelete }: { user: { id: string; name: string; email: string; role: string }, onDelete: (userId: string) => void } ) {
    const [role, setRole] = useState(user.role);

    async function handleDelete() {
        try {
            await axios.delete(`/api/user/${user.id}`);
            //alert('successfully deleted')
            onDelete(user.id);
        } catch(err) {
            console.error("Error deleting user:", err);
        }
    }

    async function handleUpdate() {
        try {
            let res = await axios.put(`/api/user/${user.id}`, { role });
            //alert('successfully updated')
        } catch(err) {
            console.error("Error updating user:", err);
        }
    }

    return (
        <div key={user.id} className="shadow1 rounded-lg gap-4 p-2 mb-2 flex justify-between" >
            <div>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Role: 
                    <select value={role} onChange={(e) => setRole(e.target.value)} >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                        <option value="buyer">Buyer</option>
                    </select>
                </p>
            </div>

            <div className="flex flex-col gap-2" >
                {/* Action buttons like Edit, Delete can be added here */}
                <button onClick={handleUpdate} className="button-2" >Update</button>
                <button onClick={handleDelete} className="bg-(--color6) text-white px-2 py-1 rounded-lg hover:opacity-70" >Delete</button>
            </div>

        </div>
    );
}


export function ManageUsers() {
    const { myProfile } = useAuthContext()
    const [users, setUsers] = useState<Array<{ id: string; name: string; email: string; role: string }>>([]);

    useEffect(() => {
        if (!myProfile || myProfile.role !== "admin") return;

        async function FetchUsers() {
            try {
                let res = await axios.get("/api/user");
                setUsers(res.data.users);
            } catch (err) {
                console.error("Error fetching users:", err);
            }
        }

        FetchUsers();

    }, [myProfile])

    function handleDelete(userId: string) {
        // Implement user deletion logic here
        // After successful deletion, update the users state to remove the deleted user
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    }


    return (
        <div>
            <h2>Manage Users</h2>
            {users && users.length > 0 && users.map(user => <UserCard key={user.id} user={user} onDelete={() => handleDelete(user.id)}  />)}
        </div>
    );
}