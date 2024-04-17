import { Input } from "@/components/ui/input";

export default function TextInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
    return (
        <Input {...props}></Input>
    );
}