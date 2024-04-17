import { Button } from "../../ui/button";

export default function SecondaryButton({ text, onClick }: { text: string, onClick?: React.MouseEventHandler<HTMLButtonElement> }) {
    return (
        <Button disabled={onClick ? false : true} variant={"secondary"} onClick={onClick}>
            {text}
        </Button>
    );
}