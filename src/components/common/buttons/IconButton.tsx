import { IconType } from "react-icons";
import { Button } from "../../ui/button";
import { ButtonProps } from "./interface/ButtonProps";
import { Children } from "react";
import { Loader2 } from "lucide-react";
interface IconButtonProps extends ButtonProps {
    Icon: IconType,
    rightIcon?: boolean,
    variant?: "default" | "destructive" | "outline" | "secondary" | "ghost",
    isLoading?: boolean
    disabled?: boolean
    iconSize?: number
}

export default function IconButton(props: IconButtonProps) {
    const { type, children, fullwidth, onClick, rightIcon, Icon, variant, isLoading, disabled, iconSize } = { ...props };
    return (
        <Button type={type} variant={variant} size={children ? 'default' : 'icon'} onClick={onClick} className={`${fullwidth ? 'w-full' : ''}`} disabled={disabled}>
            {rightIcon ? Children.toArray(children) : null}{isLoading ? <Loader2 className={ children ? rightIcon ? 'ml-2 w-4 h-4 animate-spin' : 'mr-2 w-4 h-4 animate-spin' : 'w-4 h-4 animate-spin' } /> : <Icon className={ children ? rightIcon ? 'ml-2' : 'mr-2' : '' } size={iconSize} /> } {!rightIcon ?  Children.toArray(children) : null}
        </Button>
    );
}