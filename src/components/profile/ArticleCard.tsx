"use client"

import { Card } from "../common/Card";
import { Text } from "@/components/common/display/Texts";
import UserAvatar from "../common/display/UserAvatar";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ArticleCard({title, body, date, authorId,id} : {title: string, body: string, date: Date, authorId?: string, id?: string}){

    const [author, setAuthor] = useState<User | null>(null);

    const [error, setError] = useState<boolean>(false);
    
    useEffect(() => {
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
                setError(true);
            }
        }
        
        if(authorId){            
            getAuthorInfos(authorId).then((value) => {
                setAuthor(value.user);
            });
        }
    }, []);    
    
    if(error){
        useRouter().push('/auth/signin');
    }

    return(
        <Link href={id ? `/articles/${id}` : '#'} className="xl:w-[45%] xl:min-w-[45%] w-full">
            <Card className="p-4 flex flex-col">
                <div className="flex flex-col xl:flex-row xl:justify-between">
                    <Text text={title} fontWeight="bold"/>
                    <Text text={`${new Date(date).toLocaleDateString()}`} variant="small"/>
                </div>            
                
                    {
                        author ?  
                        <div className="flex space-x-2 items-center">
                            <Text text="Ecrit par "/>
                            <Text text={author.name ?? ''} fontWeight="semibold"/>
                            <div className="size-[30px]">
                                <UserAvatar username={author.name ?? ''} source={author.image ?? ''} />
                            </div> 
                        </div>
                        : <></>
                    }
                    
                <Text text={body}/>
            </Card>        
        </Link>
        
    );
}