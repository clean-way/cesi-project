"use client";
import { useState, useEffect } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card } from "@/components/common/Card";
import Formfield from "@/components/common/inputs/Formfield";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Textarea from "@/components/common/inputs/TextArea";
import { DateTimePicker } from "@/components/ui/date-time-picker";

const formSchema = z.object({
    name: z
    .string({ required_error: "Le nom est requis" }),    
    description: z.string({ required_error: "La description est requise" }),
    startDatetime: z.date().nullable(),
    endDatetime: z.date().nullable(),
    longitude: z.string().nullable(),
    latitude: z.string().nullable(),
});

export const CleanwalkForm = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const errors: { [key: string]: string } = {
        CredentialsSignin: "Email ou mot de passe incorrect",
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);

        const response = await fetch("/api/cleanwalk", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: values.name,
                description: values.description,
                startAt: values.startDatetime,
                endAt: values.endDatetime,
                longitude: values.longitude,
                latitude: values.latitude,
            }),
        });

        if (response.ok) {
            window.location.href = "/cleanwalks";
        } else {
            const data = await response.json();
            setError(errors[data.message] || "Une erreur s'est produite");
        }

    setLoading(false);
    };  
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    return (
        <Card className="p-[32px] w-full sm:w-[500px] rounded-[24px] drop-shadow-lg m-4 md:m-0">
            <h1 className="text-[32px] font-bold mb-4 text-primary">CleanWalk</h1>
            <Form {...form}>
                <form
                    className="space-y-4 w-full"
                    onSubmit={form.handleSubmit(onSubmit)}
                    >
                    <Formfield name="name" placeholder="Cleanwalk" control={form.control} />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field } : {field : any}) => (
                            <FormItem>
                                <FormControl>
                                    <Textarea
                                    placeholder="Cleanwalk sur les bord de Seine"
                                    className="resize-none"
                                    {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="startDatetime"
                        render={({ field } : {field : any}) => (
                            <FormItem>
                                <FormLabel>Date de début</FormLabel>
                                <FormControl>
                                <DateTimePicker granularity="minute" hourCycle={24} jsDate={field.value} onJsDateChange={field.onChange} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="endDatetime"
                        render={({ field } : {field : any}) => (
                            <FormItem>
                                <FormLabel>Date de fin</FormLabel>
                                <FormControl>
                                <DateTimePicker granularity="minute" hourCycle={24} jsDate={field.value} onJsDateChange={field.onChange} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="latitude"
                        render={({ field } : {field : any}) => (
                            <FormItem>
                                <FormLabel>Latitude</FormLabel>
                                <FormControl>
                                    <Formfield {...field} type="number" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="longitude"
                        render={({ field } : {field : any}) => (
                            <FormItem>
                                <FormLabel>Longitude</FormLabel>
                                <FormControl>
                                    <Formfield {...field} type="number" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {
                        error && <div className="text-red-500 text-sm">{error}</div>
                    }
                    <div className="space-y-1">
                        <PrimaryButton fullwidth type="submit" disabled={loading}>
                        {loading ? (
                            <Loader2 className="w-6 h-6 animate-spin" />
                        ) : (
                            "Créer"
                        )}
                        </PrimaryButton>
                    </div>          
                </form>
            </Form>
        </Card>
    );
};
