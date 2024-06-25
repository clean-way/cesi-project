import { Card } from "@/components/common/Card";
import UserAvatar from "@/components/common/display/UserAvatar";
import { Text } from "@/components/common/display/Texts";
import TrashCard from "@/components/profile/TrashCard";
import { FaSmoking, FaMaskFace  } from "react-icons/fa6";
import { PiTireDuotone  } from "react-icons/pi";
import RoleBadge from "@/components/profile/RoleBadge";
import ArticleCard from "@/components/profile/ArticleCard";
import { User } from "@prisma/client";

export default function ProfilePageContent({user} : {user : User}){
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
                            <TrashCard Icon={FaSmoking} quantity={2} label="poignées"/>
                            <TrashCard Icon={PiTireDuotone} quantity={1} label="unité"/>  
                            <TrashCard Icon={FaMaskFace} quantity={10} label="unités"/> 
                            <TrashCard Icon={FaSmoking} quantity={2} label="poignées"/>
                            <TrashCard Icon={PiTireDuotone} quantity={1} label="unité"/>  
                            <TrashCard Icon={FaMaskFace} quantity={10} label="unités"/> 
                            <TrashCard Icon={FaSmoking} quantity={2} label="poignées"/>
                            <TrashCard Icon={PiTireDuotone} quantity={1} label="unité"/>  
                            <TrashCard Icon={FaMaskFace} quantity={10} label="unités"/> 
                            <div className="w-[140px] invisible"></div>
                            <div className="w-[140px] invisible"></div>
                            <div className="w-[140px] invisible"></div>
                            <div className="w-[140px] invisible"></div>    
                            <div className="w-[140px] invisible"></div>
                            <div className="w-[140px] invisible"></div>
                            <div className="w-[140px] invisible"></div>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Text text="Articles publiés" variant="h4" fontWeight="semibold"/>
                        <div className="w-full flex flex-wrap justify-between items-start gap-y-4">
                            <ArticleCard 
                                title="Récap de ma première greenwalk !" 
                                body="Petit article autjourd'hui pour vous faire un récapitulatif de mon expérience lors de ma première greenwalk"
                                date={new Date("2024-01-12")}
                                />
                            <ArticleCard 
                                title="Récap de ma première greenwalk !" 
                                body="Petit article autjourd'hui pour vous faire un récapitulatif de mon expérience lors de ma première greenwalk"
                                date={new Date("2024-01-30")}
                                />
                            <ArticleCard 
                                title="Récap de ma première greenwalk !" 
                                body="Petit article autjourd'hui pour vous faire un récapitulatif de mon expérience lors de ma première greenwalk"
                                date={new Date("2024-02-01")}
                                />
                        </div>
                    </div>
                </Card>
            </section>
    );
}