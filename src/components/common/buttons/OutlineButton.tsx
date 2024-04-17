import { Button } from "../../ui/button";

export default function OutlineButton({ text, onClick }: { text: string, onClick?: React.MouseEventHandler<HTMLButtonElement> }) {
    return (
        <Button disabled={onClick ? false : true} variant={"outline"} onClick={onClick}>
            {text}
        </Button>
    );
}