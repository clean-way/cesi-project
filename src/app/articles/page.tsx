"use client"
import { Card } from "@/components/common/Card";
import { Text } from "@/components/common/display/Texts";
import ArticlesList from "./ArticlesList";
import { useEffect, useState } from "react";
import { Articles } from "@prisma/client";
import Header from "@/components/common/Header";

async function getArticles() : Promise<any>{
    try {
        const rawResponse = await fetch(`${process.env.NEXT_PUBLIC_NEXTAPI_URL}/article`,
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

export default function ArticlesPage(){

    const [articles, setArticles] = useState<Array<Articles>>([]);
    
    useEffect(() => {
        getArticles().then((value) => {
            setArticles(value.articles);
        });
    }, []);
    
    return(
        <section className="bg-ct-blue-600 min-h-screen xl:py-10 xl:px-5">
            <Card className="container mx-auto p-8 xl:p-12 h-full flex flex-col justify-center space-y-5">
                <div className="space-y-8">
                    <div className="space-y-2">
                        <Text text="Articles du jour" variant="h4" fontWeight="semibold" />
                        <ArticlesList articles={articles.filter((x) => new Date(x.createdAt).setHours(0,0,0,0) == new Date().setHours(0,0,0,0))}/>
                    </div>
                    <div className="space-y-2">
                        <Text text="Articles de la semaine" variant="h4" fontWeight="semibold" />
                        <ArticlesList articles={articles.filter((x) => new Date(x.createdAt).setHours(0,0,0,0) != new Date().setHours(0,0,0,0))}/>
                    </div>
                </div>
            </Card>
        </section>
    );
}