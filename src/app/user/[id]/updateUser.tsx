"use client"

import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";


export default function UpdateUserButton() {


async function updateUser(id: string) {
    try {
        
        const rawResponse = await fetch(`${process.env.NEXT_PUBLIC_NEXTAPI_URL}/user/${id}`,
            {
                method: 'PUT',
                body: JSON.stringify({
                    name: "John Doe",
                    email: "prout@prout.fr"
                }),
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
        if (!rawResponse.ok) {
            console.log(rawResponse);

            throw new Error('Failed to fetch data');
        }

        const user = await rawResponse.json() as User;
        return user;
    } catch (err) {
        throw err;
    }
}

    return (
        <Button onClick={() =>
            updateUser("clxszddhp00005821xv81e9fh")
        }>UPDATE</Button>
    )
}