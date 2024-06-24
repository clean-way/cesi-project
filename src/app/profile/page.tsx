import { Card } from "@/components/common/Card";
import { SkeletonLine, SkeletonRound } from "@/components/common/Skeletons";
import UserAvatar from "@/components/common/display/UserAvatar";
import { Text } from "@/components/common/display/Texts";
import TrashCard from "@/components/profile/TrashCard";
import { FaSmoking, FaMaskFace  } from "react-icons/fa6";
import { PiTireDuotone  } from "react-icons/pi";

export default function ProfilePage(){
    return (
        <>
            <section className="bg-ct-blue-600 min-h-screen py-20 px-10">
                <Card className="container mx-auto p-12 h-full flex flex-col justify-center space-y-12">
                    <div className="flex w-full space-x-8">
                        <UserAvatar size={120} username="Jean-Paul DUPONT" source="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg"/>
                        {/* <SkeletonRound height={120} /> */}
                        <div className="flex flex-col space-y-1 justify-center">
                            <Text text="Jean-Paul DUPONT" variant="h3"/>
                            <Text text="Membre depuis le 12 Janvier 2024" />
                            {/* <SkeletonLine height={40} width={350} />
                            <SkeletonLine /> */}
                        </div>
                    </div>
                    <div className="flex">
                        <Text text="A participé à"/>
                        <Text text="12" fontWeight="bold"/>
                        <Text text="greenwalks"/>
                    </div>
                    <div className="space-y-2">
                        <Text text="Déchets ramassés" variant="h4" fontWeight="semibold"/>
                        <div className="w-full flex flex-wrap gap-4 items-center">
                            <TrashCard Icon={FaSmoking} quantity={2} label="poignées"/>
                            <TrashCard Icon={PiTireDuotone} quantity={1} label="unité"/>  
                            <TrashCard Icon={FaMaskFace} quantity={10} label="unités"/> 
                            <TrashCard Icon={FaSmoking} quantity={2} label="poignées"/>
                            <TrashCard Icon={PiTireDuotone} quantity={1} label="unité"/>  
                            <TrashCard Icon={FaMaskFace} quantity={10} label="unités"/> 
                            <TrashCard Icon={FaSmoking} quantity={2} label="poignées"/>
                            <TrashCard Icon={PiTireDuotone} quantity={1} label="unité"/>  
                            <TrashCard Icon={FaMaskFace} quantity={10} label="unités"/>                             
                        </div>
                    </div>
                </Card>
            </section>
        </>
    );
}