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

export default function TestPage() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values);
    }
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
                <CheckboxWithText text="Checkbox with text" checked={false} />
                <CheckboxWithText disabled text="Checkbox with text disabled" checked={false} />
                <CheckboxWithText text="Checkbox with text checked" checked={true} />
                <CheckboxWithText disabled text="Checkbox with text disabled checked" checked={true} />
            </div>
            <div className="flex p-4 border w-1/6">
                <Form {...form}>
                    <form className="space-y-3 w-full" onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="flex space-x-2">
                            <FormField
                                control={form.control}
                                name="lastname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <TextInput placeholder="Lastname" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                            <FormField
                                control={form.control}
                                name="firstname"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <TextInput placeholder="Firstname" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                        </div>
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <TextInput placeholder="Email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <TextInput type="password" placeholder="Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <TextInput type="password" placeholder="Confirm Password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                        <PrimaryButton fullwidth text="Submit" type="submit" />
                    </form>
                </Form>
            </div>
        </div>
    );
}