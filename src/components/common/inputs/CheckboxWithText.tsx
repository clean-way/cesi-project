import { Checkbox } from "@/components/ui/checkbox";

export default function CheckboxWithText({ text, disabled, checked, onCheckedChange }: { text: string, disabled?: boolean, checked?: boolean, onCheckedChange?: React.Dispatch<React.SetStateAction<boolean | undefined>> }) {
    return (
        <div className="flex items-center h-full">
            <Checkbox disabled={disabled} className="mr-2" checked={checked} onCheckedChange={onCheckedChange ? (value) => onCheckedChange(value.valueOf() as boolean) : undefined}></Checkbox>
            <div onClick={onCheckedChange ? () => onCheckedChange(!checked) : undefined} className={`font-medium cursor-pointer select-none text-sm ${disabled ? 'text-muted-foreground' : null}`}>
                {text}
            </div>
        </div>
    );
}