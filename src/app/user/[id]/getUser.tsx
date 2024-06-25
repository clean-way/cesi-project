"use client"

import { Button } from "@/components/ui/button";
import { CleanWalk, User } from "@prisma/client";
import { useSession } from "next-auth/react";


export default function GetUserButton() {


async function getUser(id: string) {
    try {
        
        const rawResponse = await fetch(`${process.env.NEXT_PUBLIC_NEXTAPI_URL}/cleanwalk/${id}`,
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

        const cleanwalk = await rawResponse.json() as CleanWalk;
        return cleanwalk;
    } catch (err) {
        throw err;
    }
}

    return (
        <Button onClick={() =>
            getUser("1")
        }>GET</Button>
    )
}