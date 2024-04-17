import Link from "next/link";
import { Button } from "../../ui/button";

export default function Hyperlink({ text, href }: { text: string, href: string }) {
    return (
        <Button asChild variant={'link'}>
            <Link href={href}>{text}</Link>
        </Button>
    );
}