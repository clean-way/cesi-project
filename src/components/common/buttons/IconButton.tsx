import { IconType } from "react-icons";
import { Button, ButtonProps } from "../../ui/button";

export default function IconButton({ Icon, text, rightIcon, variant, onClick }: { Icon: IconType, text?: string, rightIcon?: boolean, variant?: "default" | "destructive" | "outline" | "secondary" | "ghost", onClick?: React.MouseEventHandler<HTMLButtonElement> }) {
    return (
        <Button disabled={onClick ? false : true} variant={variant} size={text ? 'default' : 'icon'} onClick={onClick}>
            {rightIcon ? text : null}<Icon className={text ? rightIcon ? 'ml-2' : 'mr-2' : ''} /> {!rightIcon ? text : null}
        </Button>
    );
}