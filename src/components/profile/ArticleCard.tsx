"use client"

import { Card } from "../common/Card";
import { Text } from "@/components/common/display/Texts";
import UserAvatar from "../common/display/UserAvatar";
import { useEffect, useState } from "react";
import { Prisma, User } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import NeedAuthButton from "../common/NeedAuthButton";

type Author = Prisma.UserGetPayload<{
    select: {
        name: true,
        image: true
    }
}>;

export default function ArticleCard({title, body, date, author, id} : {title: string, body: string, date: Date, author: Author, id: string}){

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
                    
                <Text text={body.length > 100 ? body.slice(0, 100) + '...' : body}/>
            </Card>        
        </Link>
        
    );
}