"use client"
import { Card } from "@/components/common/Card";
import { Text } from "@/components/common/display/Texts";
import { useEffect, useState } from "react";
import { Articles, User } from "@prisma/client";
import Image from "next/image";
import UserAvatar from "@/components/common/display/UserAvatar";

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

async function getAuthorInfos(id: string) : Promise<any>{
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

export default function ArticlePage({params} : {params: {id : string}}){

    const {id} = params;

    const [article, setArticle] = useState<Articles | null>();
    const [author, setAuthor] = useState<User | null>();
    
    useEffect(() => {
        getArticle(id).then((value) => {
            setArticle(value.article);
            getAuthorInfos(value.article.authorId).then((value) => {
                setAuthor(value.user);
            });
        });
        
    }, []);

    if(!article || !author){
        return <></>;
    }
    
    return(
        <section className="bg-ct-blue-600 min-h-screen xl:py-10 xl:px-5">
            <Card className="container mx-auto p-8 xl:px-12 xl:pb-12 h-full flex flex-col justify-center space-y-5">
                <div className="flex justify-center xl:justify-start items-center space-x-2 pb-4">                    
                    <Image src='/cleanway.png' width={40} height={50} alt='Cleanway' />  
                    <Text text="Cleanway" variant="h2"/>
                </div>
                <div className="space-y-1">                                        
                    <Text text={article.title} variant="h4" fontWeight="semibold" />
                    <div className="flex space-x-2 items-center">
                        <Text text="Ecrit par "/>
                        <Text text={author.name ?? ''} fontWeight="semibold"/>
                        <div className="size-[30px]">
                            <UserAvatar username={author.name ?? ''} source={author.image ?? ''} />
                        </div> 
                    </div>
                    <div className="py-5">
                        <Text text={article.body}/>
                    </div>
                    <div className="flex justify-end">
                        <Text text={`${new Date(article.createdAt).toLocaleDateString()}`} variant="small"/>
                    </div>
                </div>
            </Card>
        </section>
    );
}