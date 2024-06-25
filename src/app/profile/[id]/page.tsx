"use client"

import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import ProfilePageContent from "./ProfilePageContent";

async function getUser(id: string) : Promise<any>{
    try {
        const rawResponse = await fetch(`${process.env.NEXT_PUBLIC_NEXTAPI_URL}/user/${id}`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!rawResponse.ok) {
            console.log(rawResponse);

            throw new Error('Failed to fetch data');
        }

        return await rawResponse.json();
    } catch (err) {
        throw err;
    }
}

export default function ProfilePage({params}: {params: {id : string}}){
    const {id} = params;

    const [user, setUser] = useState<User | null>(null);
    
    useEffect(() => {
        getUser(id).then((value) => {
            setUser(value.user);
        });
    }, []);

    if(!user){
        return <div></div>;
    }

    return (
        <ProfilePageContent user={user}/>
    );
}