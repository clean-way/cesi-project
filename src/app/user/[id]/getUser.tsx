"use client"

import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";


export default function GetUserButton() {


async function getUser(id: string) {
    try {
        
        const rawResponse = await fetch(`${process.env.NEXT_PUBLIC_NEXTAPI_URL}/user/${id}`,
            {
                method: 'GET',
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
            getUser("clxsripb7000011d6chducu3a")
        }>GET</Button>
    )
}