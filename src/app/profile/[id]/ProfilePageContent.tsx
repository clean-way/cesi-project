import { Card } from "@/components/common/Card";
import UserAvatar from "@/components/common/display/UserAvatar";
import { Text } from "@/components/common/display/Texts";
import TrashCard from "@/components/profile/TrashCard";
import { FaSmoking, FaMaskFace, FaBottleWater, FaCarBurst, FaFishFins, FaCartShopping } from "react-icons/fa6";
import { PiTireDuotone, PiBirdFill, PiTreeEvergreenBold } from "react-icons/pi";
import { GrPaint } from "react-icons/gr";
import RoleBadge from "@/components/profile/RoleBadge";
import ArticleCard from "@/components/profile/ArticleCard";
import { Prisma, User } from "@prisma/client";

type UserWithArticles = Prisma.UserGetPayload<{
    include: {
        articles: true
    }
}>;

export default function ProfilePageContent({user} : {user : UserWithArticles}){
    return (
        <section className="bg-ct-blue-600 min-h-screen xl:py-10 xl:px-5">
                <Card className="container mx-auto p-8 xl:p-12 h-full flex flex-col justify-center space-y-5">
                    <div className="flex w-full space-x-4 xl:space-x-8">
                        <div className="size-1/3 xl:size-1/12 flex flex-col items-center">                            
                            <UserAvatar username={user.name ?? 'Utilisateur Inconnu'} source={user.image ?? ''}/>
                        </div>
                        <div className="flex flex-col space-y-1 justify-center">
                            <div className="flex space-x-3 items-center">                                
                                <Text text={user.name ?? 'Utilisateur Inconnu'} variant="h3"/>
                                <div className="hidden xl:block">
                                    <RoleBadge role={user.role} />
                                </div>
                            </div>
                            <Text text={`Membre depuis le ${new Date(user.createdAt).toLocaleDateString()}`} variant="small"/>
                            <div className="block xl:hidden">
                                <RoleBadge role={user.role} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-row space-x-2">
                            <Text text="A participé à"/>
                            <Text text="12" fontWeight="bold"/>
                            <Text text="greenwalks"/>
                        </div>
                        <div className="flex flex-wrap space-x-1">
                            <Text text="Nous a aidé à recencer "/>
                            <Text text="59" fontWeight="bold"/>
                            <Text text="déchets !"/>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Text text="Déchets ramassés" variant="h4" fontWeight="semibold"/>
                        <div className="w-full flex flex-wrap gap-4 justify-center">
                            <TrashCard Icon={FaSmoking} quantity={2} label="poignées"/>
                            <TrashCard Icon={PiTireDuotone} quantity={1} label="unité"/>  
                            <TrashCard Icon={FaMaskFace} quantity={10} label="unités"/> 
                            <TrashCard Icon={FaBottleWater} quantity={2} label="unités"/>
                            <TrashCard Icon={PiBirdFill} quantity={3} label="kg"/>  
                            <TrashCard Icon={GrPaint} quantity={10} label="unités"/> 
                            <TrashCard Icon={PiTreeEvergreenBold} quantity={1} label="unité"/>
                            <TrashCard Icon={FaCarBurst} quantity={1} label="unité"/>  
                            <TrashCard Icon={FaFishFins} quantity={10} label="kg"/>
                            <TrashCard Icon={FaCartShopping} quantity={2} label="unités"/>
                            <div className="w-[120px] xl:w-[140px] collapse xl:invisible"></div>
                            <div className="w-[120px] xl:w-[140px] collapse xl:invisible"></div>
                            <div className="w-[120px] xl:w-[140px] collapse xl:invisible"></div>
                            <div className="w-[120px] xl:w-[140px] collapse xl:invisible"></div>    
                            <div className="w-[120px] xl:w-[140px] collapse xl:invisible"></div>
                            <div className="w-[120px] xl:w-[140px] collapse xl:invisible"></div>
                            <div className="w-[120px] xl:w-[140px] collapse xl:invisible"></div>  
                            <div className="w-[120px] xl:w-[140px] collapse xl:invisible"></div>
                            <div className="w-[120px] xl:w-[140px] collapse xl:invisible"></div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Text text="Articles publiés" variant="h4" fontWeight="semibold"/>
                        <div className="w-full flex flex-wrap justify-between items-start gap-y-4">
                            {
                                user.articles.map((article) => (
                                    <ArticleCard 
                                        key={article.id}
                                        title={article.title} 
                                        body={article.body}
                                        date={article.createdAt}
                                        author={user}
                                        id={article.id}
                                    />
                                ))
                            }
                        </div>
                    </div>
                </Card>
            </section>
    );
}