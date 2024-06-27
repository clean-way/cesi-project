import ArticleCard from "@/components/profile/ArticleCard";
import { Articles, Prisma } from "@prisma/client";
import { Text } from "@/components/common/display/Texts";

type ArticleWithAuthor = Prisma.ArticlesGetPayload<{
    include: { author: {
        select: {
            name: true,
            image: true
        }
    } };
}>;

export default function ArticlesList({articles} : {articles : Array<ArticleWithAuthor>}){
    return (
        <div className="w-full flex flex-wrap justify-between items-start gap-y-4">
            {articles.length > 0 ? 
                articles.map((article) => 
                <ArticleCard
                    key={article.id}
                    title={article.title} 
                    body={article.body} 
                    date={article.createdAt}
                    author={article.author}
                    id={article.id}
                    />) : 
                <div className="w-full flex justify-center py-4">
                    <Text text='Aucun article dans cette catégorie' italic/>
                </div>
            }
            
        </div>
    );
}