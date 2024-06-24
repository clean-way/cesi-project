import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserAvatar({size = 50, source, username} : {size?: number, source: string, username: string}){
    return (
        <Avatar style={{height: size, width: size}}>
            <AvatarImage src={source} alt={username} />
            <AvatarFallback>{username[1]}</AvatarFallback>
        </Avatar>
    );
}