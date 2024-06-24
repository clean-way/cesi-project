import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserAvatar({source, username} : {size?: number, source: string, username: string}){
    const split = username.split(' ');
    return (
        <Avatar className="size-full">
            <AvatarImage src={source} alt={username} />
            <AvatarFallback className="w-full h-full">{`${split[0][0]}${split[1][0] ?? ''}`}</AvatarFallback>
        </Avatar>
    );
}