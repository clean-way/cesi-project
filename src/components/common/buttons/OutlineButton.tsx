import { Button } from "../../ui/button";
import { ButtonProps } from "./interface/ButtonProps";
import { Children } from "react";

export default function OutlineButton(props: ButtonProps) {
    const { type, children, fullwidth, onClick } = { ...props };
    return (
        <Button type={type} disabled={type === 'submit' ? false : (onClick ? false : true)} variant={"outline"} onClick={onClick} className={`${fullwidth ? 'w-full' : ''}`}>
            {Children.toArray(children)}
        </Button>
    );
}