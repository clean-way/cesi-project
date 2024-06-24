import { Children } from "react";
import { Button } from "../../ui/button";
import { ButtonProps } from "./interface/ButtonProps";

export default function PrimaryButton(props: ButtonProps) {
    const { type, children, fullwidth, onClick, disabled = false } = { ...props };
    return (
        <Button type={type} disabled={disabled} onClick={onClick} className={`${fullwidth ? 'w-full' : ''}`}>
            {Children.toArray(children)}
        </Button>
    );
}