import { IconType } from "react-icons";
import { Button } from "../../ui/button";
import { ButtonProps } from "./interface/ButtonProps";

interface IconButtonProps extends ButtonProps {
    Icon: IconType,
    rightIcon?: boolean,
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost",
}

export default function IconButton(props: IconButtonProps) {
    const { type, text, fullwidth, onClick, rightIcon, Icon, variant } = { ...props };
    return (
        <Button type={type} disabled={type === 'submit' ? false : (onClick ? false : true)} variant={variant} size={text ? 'default' : 'icon'} onClick={onClick} className={`${fullwidth ? 'w-full' : ''}`}>
            {rightIcon ? text : null}<Icon className={text ? rightIcon ? 'ml-2' : 'mr-2' : ''} /> {!rightIcon ? text : null}
        </Button>
    );
}