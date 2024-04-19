'use client'

import DestructiveButton from "@/components/common/buttons/DestructiveButton";
import Hyperlink from "@/components/common/buttons/Hyperlink";
import IconButton from "@/components/common/buttons/IconButton";
import OutlineButton from "@/components/common/buttons/OutlineButton";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import SecondaryButton from "@/components/common/buttons/SecondaryButton";
import CheckboxWithText from "@/components/common/inputs/CheckboxWithText";
import TextInput from "@/components/common/inputs/TextInput";
import { FaPlus, FaTrashCan, FaArrowRight } from "react-icons/fa6";

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { H1, H2, H3, H4, H5, H6, P, Text } from "@/components/common/Texts";
import Formfield from "@/components/common/inputs/Formfield";
import { DatePicker, FormDatePicker } from "@/components/common/inputs/DatePickers";
import React from "react";

const formSchema = z.object({
    firstname: z.string({ required_error: 'Firstname is required' }).min(2, { message: "Firstname must be at least 2 characters." }).max(50, { message: "Firstname must be at most 50 characters." }),
    lastname: z.string({ required_error: 'Lastname is required' }).min(2, { message: "Lastname must be at least 2 characters." }).max(50, { message: "Lastname must be at most 50 characters." }),
    email: z.string({ required_error: 'Email is required' }).email({ message: 'Email must be valid' }),
    password: z.string({ required_error: 'Password is required' }).regex(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$")),
    confirmPassword: z.string({ required_error: 'ConfirmPassword is required' }),
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "Passwords did not match"
        });
    }
});

const dateFormSchema = z.object({
    date: z.date({
        required_error: "A date is required.",
    }),
})

export default function TestPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }

    const dateForm = useForm<z.infer<typeof dateFormSchema>>({
        resolver: zodResolver(dateFormSchema),
    })
    function onSubmitDate(values: z.infer<typeof dateFormSchema>) {
        console.log(values);
    }


    const [checked, setChecked] = React.useState<boolean>();
    const [date, setDate] = React.useState<Date>();

    return (
        <div className="p-8 space-y-8">
            <div className="flex space-x-5">
                <PrimaryButton text="Primary" onClick={() => { }} />
                <PrimaryButton text="PrimaryDisabled" />
                <SecondaryButton text="Secondary" onClick={() => { }} />
                <OutlineButton text="OutlineButton" onClick={() => { }} />
                <DestructiveButton text="Destructive" onClick={() => { }} />
                <DestructiveButton text="DestructiveDisabled" />
                <IconButton Icon={FaPlus} onClick={() => { }} />
                <IconButton Icon={FaPlus} text="ButtonWithLeftIcon" onClick={() => { }} />
                <IconButton Icon={FaArrowRight} text="ButtonWithRightIcon" rightIcon onClick={() => { }} />
                <IconButton Icon={FaTrashCan} text="ButtonWithLeftIconDestructive" variant="destructive" onClick={() => { }} />
                <Hyperlink text="Hyperlink" href="#" />
            </div>
            <div className="flex space-x-5">
                <div>
                    <TextInput placeholder="Placeholder" />
                </div>
                <div>
                    <TextInput placeholder="Disabled" disabled />
                </div>
                <CheckboxWithText text="Checkbox with text" checked={checked} onCheckedChange={setChecked} />
                <CheckboxWithText disabled text="Checkbox with text disabled" checked={false} />
                <CheckboxWithText text="Checkbox with text checked" checked={true} />
                <CheckboxWithText disabled text="Checkbox with text disabled checked" checked={true} />
            </div>
            <div className="flex space-x-5 items-center">
                <DatePicker date={date} setDate={setDate} />
                <div className="border p-3">
                    <Form {...dateForm}>
                        <form className="flex space-x-3" onSubmit={dateForm.handleSubmit(onSubmitDate)}>
                            <FormDatePicker control={dateForm.control} name="date" />
                            <PrimaryButton text="Submit" type="submit" />
                        </form>
                    </Form>
                </div>
            </div>
            <div className="flex space-x-10">
                <div className="flex p-4 border w-1/6">
                    <Form {...form}>
                        <form className="space-y-3 w-full" onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="flex space-x-2">
                                <Formfield name="lastname" placeholder="Lastname" control={form.control} />
                                <Formfield name="firstname" placeholder="Firstname" control={form.control} />
                            </div>
                            <Formfield name="email" placeholder="Email" control={form.control} />
                            <Formfield name="password" placeholder="Password" control={form.control} type="password" />
                            <Formfield name="confirmPassword" placeholder="Confirm Password" control={form.control} type="password" />
                            <PrimaryButton fullwidth text="Submit" type="submit" />
                        </form>
                    </Form>
                </div>
                <div className="flex flex-col p-4 border w-1/6">
                    <H1 text="Heading 1" />
                    <H2 text="Heading 2" />
                    <H3 text="Heading 3" />
                    <H4 text="Heading 4" />
                    <H5 text="Heading 5" />
                    <H6 text="Heading 6" />
                    <P text="Paragraph" />
                </div>
                <div className="flex flex-col p-4 border w-1/6">
                    <Text variant="h1" text="Heading 1" underline fontWeight="semibold" />
                    <Text variant="h2" text="Heading 2" italic underline />
                    <Text variant="h3" text="Heading 3" fontWeight="medium" />
                    <Text variant="h4" text="Heading 4" fontWeight="semibold" underline />
                    <Text variant="h5" text="Heading 5" italic />
                    <Text variant="h6" text="Heading 6" />
                    <Text text="Paragraph" fontWeight="bold" />
                </div>
            </div>
        </div>
    );
}