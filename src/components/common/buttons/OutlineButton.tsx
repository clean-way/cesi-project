import { Button } from "../../ui/button";
import { ButtonProps } from "./interface/ButtonProps";

export default function OutlineButton(props: ButtonProps) {
    const { type, text, fullwidth, onClick } = { ...props };
    return (
        <Button type={type} disabled={type === 'submit' ? false : (onClick ? false : true)} variant={"outline"} onClick={onClick} className={`${fullwidth ? 'w-full' : ''}`}>
            {text}
        </Button>
    );
}