import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import TextInput from "./TextInput";
import { Control } from "react-hook-form";
import { HTMLInputTypeAttribute } from "react";

export interface FormfieldProps {
    name: string,
    placeholder?: string,
    control?: Control<any>,
    type?: HTMLInputTypeAttribute,
    label?: string,
}

export default function Formfield(props: FormfieldProps) {
    const { name, placeholder, control, type, label } = { ...props };
    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    {label && <FormLabel>{label}</FormLabel>}
                    <FormControl>
                        <TextInput type={type} placeholder={placeholder} {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )} />
    );
}