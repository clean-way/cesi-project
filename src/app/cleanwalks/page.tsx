"use client"
import { Card } from "@/components/common/Card";
import { Text } from "@/components/common/display/Texts";
import { useEffect, useState } from "react";
import { Articles, CleanWalk } from "@prisma/client";
import CleanwalksList from "./CleanwalksList";
import Header from "@/components/common/Header";

async function getCleanwalks() : Promise<any>{
    try {
        const rawResponse = await fetch(`${process.env.NEXT_PUBLIC_NEXTAPI_URL}/cleanwalk`,
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

export default function CleanwalksPage(){
    const [cleanwalks, setCleanwalks] = useState<Array<CleanWalk>>([]);
    
    useEffect(() => {
        getCleanwalks().then((value) => {
            console.log(value);
            setCleanwalks(value.cleanWalks);
        });
    }, []);
    
    return(
        <>
            <Header />
            <section className="bg-ct-blue-600 min-h-screen xl:py-10 xl:px-5">
                <Card className="container mx-auto p-8 xl:p-12 h-full flex flex-col justify-center space-y-5">
                    <div className="space-y-8">
                        <div className="space-y-2">
                        <Text text="Cleanwalks de la semaine" variant="h4" fontWeight="semibold" />
                            <CleanwalksList cleanwalks={cleanwalks?.filter((x) => (new Date().getDay()- new Date(x.createdAt).getDay()) < 7) ?? []}/>
                        </div>
                    </div>
                </Card>
            </section>
        </>
    );
}