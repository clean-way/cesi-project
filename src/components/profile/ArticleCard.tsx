import { Card } from "../common/Card";
import { Text } from "@/components/common/display/Texts";

export default function ArticleCard({title, body, date} : {title: string, body: string, date: Date}){
    return(
        <Card className="xl:w-[45%] xl:min-w-[45%] w-full p-4 flex flex-col">
            <div className="flex flex-col xl:flex-row xl:justify-between">
                <Text text={title} fontWeight="bold"/>
                <Text text={`${date.toLocaleDateString()}`} variant="small"/>
            </div>
            <Text text={body}/>
        </Card>
    );
}