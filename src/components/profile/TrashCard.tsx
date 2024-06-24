import { IconType } from "react-icons";
import { Card } from "../common/Card";
import { Text } from "@/components/common/display/Texts";

export default function TrashCard({Icon, quantity, label} : {Icon : IconType, quantity: number, label: string}){
    return (
        <Card className="p-6 space-y-2 flex flex-col justify-center items-center w-[140px]">
            <Icon className="text-primary" size={30}/>
            <Text text={quantity.toString()} variant="h6"/>
            <Text text={label} />
        </Card>
    );
}