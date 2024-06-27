"use client"
import { Card } from "@/components/common/Card";
import { Text } from "@/components/common/display/Texts";
import { useEffect, useState } from "react";
import { Articles, Prisma, User } from "@prisma/client";
import UserAvatar from "@/components/common/display/UserAvatar";
import { useRouter } from "next/navigation";
import Header from "@/components/common/Header";
import NeedAuthButton from "@/components/common/NeedAuthButton";

type ArticleWithAuthor = Prisma.ArticlesGetPayload<{
    include: { author: {
        select: {
            name: true,
            image: true
        }
    } };
}>;

export default function ArticlePage({params} : {params: {id : string}}){

    const {id} = params;

    const [article, setArticle] = useState<ArticleWithAuthor | null>();
    const [error, setError] = useState<boolean>(false);
    
    useEffect(() => {
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
                setError(true);
            }
        }
        
        
        getArticle(id).then((value) => {
            setArticle(value.article);
        });
        
    }, [id]);

    if(error){
        return <NeedAuthButton/>;
    }

    if(!article){
        return <></>;
    }
    
    return(
        <>
            <section className="bg-ct-blue-600 min-h-screen xl:py-10 xl:px-5">
                <Card className="mx-auto p-8 xl:px-12 xl:pb-12 h-full flex flex-col justify-center space-y-5 m-8 xl:m-4">
                    <div className="space-y-1">                                        
                        <Text text={article.title} variant="h4" fontWeight="semibold" />
                        <div className="flex space-x-2 items-center">
                            <Text text="Ecrit par "/>
                            <Text text={article.author.name ?? ''} fontWeight="semibold"/>
                            <div className="size-[30px]">
                                <UserAvatar username={article.author.name ?? ''} source={article.author.image ?? ''} />
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
        </>
        
    );
}