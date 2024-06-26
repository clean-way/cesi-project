"use client"
import { Card } from "@/components/common/Card";
import { Text } from "@/components/common/display/Texts";
import { useEffect, useState } from "react";
import { Articles } from "@prisma/client";

async function getArticle(id: string) : Promise<any>{
    try {
        const rawResponse = await fetch(`${process.env.NEXT_PUBLIC_NEXTAPI_URL}/article/${id}`,
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

export default function ArticlePage({params} : {params: {id : string}}){

    const {id} = params;

    const [article, setArticle] = useState<Articles | null>();
    
    useEffect(() => {
        getArticle(id).then((value) => {
            setArticle(value.articles);
        });
    }, []);

    if(!article){
        return <></>;
    }
    
    return(
        <section className="bg-ct-blue-600 min-h-screen xl:py-10 xl:px-5">
            <Card className="container mx-auto p-8 xl:p-12 h-full flex flex-col justify-center space-y-5">
                <div className="space-y-8">                    
                    <Text text="Articles du jour" variant="h4" fontWeight="semibold" />
                </div>
            </Card>
        </section>
    );
}