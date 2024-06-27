import { Card, CardContent, CardHeader } from "../common/Card";
import { Text } from "@/components/common/display/Texts";
import { CleanWalk } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

export default function CleanwalkCard({cleanwalk, fullSize} : {cleanwalk : CleanWalk, fullSize?: boolean}){  
    const startDate = new Date(cleanwalk.startAt); 
    const endDate = new Date(cleanwalk.endAt); 
    const formattedDate = `${startDate.getUTCHours()}:${startDate.getUTCMinutes()} | ${endDate.getUTCHours()}:${endDate.getUTCMinutes()}`;
    return(
        <Link href={`/cleanwalks/${cleanwalk.id}`} className={`${!fullSize ? 'xl:w-[20%] xl:min-w-[20%]' : ''} w-full`}>
            <Card>
                <CardHeader className="p-0">
                    {
                        cleanwalk.bannerImage ? 
                        <Image src={cleanwalk.bannerImage} width={0} height={0} className={`rounded-t-lg`} style={{objectFit: 'cover', width: '100%', height: fullSize ? 200 : 140}} alt={cleanwalk.name} sizes="100vw" /> : 
                        <div className="flex justify-center justify-start items-center space-x-2 py-2 h-[140px]">
                            <Image
                                src="/logo_cleanway.svg"
                                alt="Cleanway"
                                width={30}
                                height={30}
                            />                       
                            <Text text="Cleanway" variant="h2"/>
                        </div>
                    }                    
                </CardHeader>
                <CardContent className="flex flex-col pt-4">
                    <div className="flex flex-col xl:flex-row xl:justify-between">
                        <Text text={cleanwalk.name} fontWeight="bold"/>
                    </div>                   
                    <Text text={cleanwalk.description}/>
                    <div className="flex justify-between pt-4">                        
                        <Text text={formattedDate} variant="small"/>                     
                        <Text text={startDate.toLocaleDateString()} variant="small"/>
                    </div>
                </CardContent>
            </Card>        
        </Link>
        
    );
}