"use client"

import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";


export default function DeleteUserButton() {


async function deleteUser(id: string) {
    try {
        
        const rawResponse = await fetch(`${process.env.NEXT_PUBLIC_NEXTAPI_URL}/user/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        )
        if (!rawResponse.ok) {
            console.log(rawResponse);

            throw new Error('Failed to fetch data');
        }

        return rawResponse;
    } catch (err) {
        throw err;
    }
}

    return (
        <Button onClick={() =>
            deleteUser("clxsripb7000011d6chducu3a")
        }>DELETE</Button>
    )
}