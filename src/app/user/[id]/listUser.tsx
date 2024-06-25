"use client"

import { Button } from "@/components/ui/button";
import { User } from "@prisma/client";

export default function ListUserButton() {


async function listUser() {
    try {
        
        const rawResponse = await fetch(`${process.env.NEXT_PUBLIC_NEXTAPI_URL}/user?limit=10&page=1`,
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

        const users = await rawResponse.json() as User[];
        return users;
    } catch (err) {
        throw err;
    }
}

    return (
        <Button onClick={() =>
            listUser()
        }>LIST</Button>
    )
}