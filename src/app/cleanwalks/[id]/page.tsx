"use client"
import { Card } from "@/components/common/Card";
import { Text } from "@/components/common/display/Texts";
import { useEffect, useState } from "react";
import { Articles, CleanWalk, User } from "@prisma/client";
import UserAvatar from "@/components/common/display/UserAvatar";
import CleanwalkCard from "@/components/cleanwalks/CleanwalkCard";
import { useRouter } from "next/navigation";
import Header from "@/components/common/Header";
import NeedAuthButton from "@/components/common/NeedAuthButton";

export default function CleanwalkPage({params} : {params: {id : string}}){

    const {id} = params;

    const [cleanwalk, setCleanwalk] = useState<CleanWalk | null>(); 

    const [error, setError] = useState<boolean>(false);
    
    useEffect(() => {
        async function getCleanwalk(id: string) : Promise<any>{
            try {
                const rawResponse = await fetch(`${process.env.NEXT_PUBLIC_NEXTAPI_URL}/cleanwalk/${id}`,
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
        
        getCleanwalk(id).then((value) => {
            setCleanwalk(value.cleanWalk);
        });
        
    }, [id]);

    if(error){
        return <NeedAuthButton/>;
    }

    if(!cleanwalk){
        return <></>;
    }
    
    return(
        <section className="bg-ct-blue-600 min-h-screen xl:py-10 xl:px-24">
            <CleanwalkCard cleanwalk={cleanwalk} fullSize/>
        </section>
    );
}