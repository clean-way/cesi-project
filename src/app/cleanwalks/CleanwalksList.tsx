import ArticleCard from "@/components/profile/ArticleCard";
import { CleanWalk } from "@prisma/client";
import { Text } from "@/components/common/display/Texts";
import CleanwalkCard from "@/components/cleanwalks/CleanwalkCard";

export default function CleanwalksList({cleanwalks} : {cleanwalks : Array<CleanWalk>}){
    return (
        <div className="w-full flex flex-wrap justify-start items-start gap-4">
            {cleanwalks.length > 0 ? 
                cleanwalks.map((cleanwalk) => 
                <CleanwalkCard cleanwalk={cleanwalk} /> ) : 
                <div className="w-full flex justify-center py-4">
                    <Text text='Aucune cleanwalks à venir pour le moment' italic/>
                </div>
            }
            
        </div>
    );
}