import { Roles } from "@prisma/client";
import { Text } from "@/components/common/display/Texts";

export default function RoleBadge({role} : {role: Roles}){
    if(role == Roles.USER || !role){
        return <div></div>;
    }

    let text = '';
    switch(role){
        case 'WRITER':
            text = 'Blogueur';
            break;
        case 'AMDIN':
            text = 'ADMIN';
            break;
        case 'MODERATOR':
            text = 'Modérateur';
            break;
        
    }
    return(
        <div className="flex w-fit justify-center items-center bg-primary text-primary-foreground p-1 rounded-md pr-2">
            <Text text={text} variant="small"/>
        </div>
    );
}