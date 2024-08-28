"use client"

import { Prisma, User } from "@prisma/client";
import { useEffect, useState } from "react";
import ProfilePageContent from "./ProfilePageContent";
import Header from "@/components/common/Header";
import { useRouter } from "next/navigation";
import NeedAuthButton from "@/components/common/NeedAuthButton";

export type UserWithArticles = Prisma.UserGetPayload<{
    include: {
        articles: true
    }
}>;

export default function ProfilePage({params}: {params: {id : string}}){
    const {id} = params;

    const [user, setUser] = useState<UserWithArticles | null>(null);

    const [error, setError] = useState<boolean>(false);
    
    useEffect(() => {
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
                setError(true);
            }
        }
        
        getUser(id).then((value) => {
            setUser(value.user);
        });
    }, [id]);

    if(error){
        return <NeedAuthButton/>;
    }

    if(!user){
        return <div></div>;
    }

    return (
        <ProfilePageContent user={user}/>
    );
}