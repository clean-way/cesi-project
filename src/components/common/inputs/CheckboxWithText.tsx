import { Checkbox } from "@/components/ui/checkbox";

export default function CheckboxWithText({ text, disabled, checked, onCheckedChange }: { text: string, disabled?: boolean, checked?: boolean, onCheckedChange?: any }) {
    return (
        <div className="flex justify-center items-center h-full">
            <Checkbox disabled={disabled} className="mr-2" checked={checked} onCheckedChange={onCheckedChange}></Checkbox>
            <div className={`font-medium text-sm ${disabled ? 'text-muted-foreground' : null}`}>
                {text}
            </div>
        </div>
    );
}