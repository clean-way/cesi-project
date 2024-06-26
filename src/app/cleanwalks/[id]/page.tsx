"use client"
import { Card } from "@/components/common/Card";
import { Text } from "@/components/common/display/Texts";
import { useEffect, useState } from "react";
import { Articles, CleanWalk, User } from "@prisma/client";
import UserAvatar from "@/components/common/display/UserAvatar";
import CleanwalkCard from "@/components/cleanwalks/CleanwalkCard";

export default function CleanwalkPage({params} : {params: {id : string}}){

    const {id} = params;

    const [cleanwalk, setCleanwalk] = useState<CleanWalk | null>();
    
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
                throw err;
            }
        }
        
        getCleanwalk(id).then((value) => {
            setCleanwalk(value.cleanWalk);
        });
        
    }, []);

    if(!cleanwalk){
        return <></>;
    }
    
    return(
        <section className="bg-ct-blue-600 min-h-screen xl:py-10 xl:px-24">
            <CleanwalkCard cleanwalk={cleanwalk} fullSize/>
        </section>
    );
}