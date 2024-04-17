import { Button } from "../../ui/button";

export default function DestructiveButton({ text, onClick }: { text: string, onClick?: React.MouseEventHandler<HTMLButtonElement> }) {
    return (
        <Button disabled={onClick ? false : true} variant={"destructive"} onClick={onClick}>
            {text}
        </Button>
    );
}