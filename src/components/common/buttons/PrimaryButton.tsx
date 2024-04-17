import { Button } from "../../ui/button";

export default function PrimaryButton({ text, onClick }: { text: string, onClick?: React.MouseEventHandler<HTMLButtonElement> }) {
    return (
        <Button disabled={onClick ? false : true} onClick={onClick}>
            {text}
        </Button>
    );
}