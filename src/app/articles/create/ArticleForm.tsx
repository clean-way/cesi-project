"use client";
import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Card } from "@/components/common/Card";
import Formfield from "@/components/common/inputs/Formfield";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import Textarea from "@/components/common/inputs/TextArea";
import { FormDatePicker } from "@/components/common/inputs/DatePickers";

const formSchema = z.object({
    name: z
    .string({ required_error: "Le nom est requis" }),    
    body: z.string({ required_error: "Le contenu est requis" }),
});

export const ArticleForm = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const errors: { [key: string]: string } = {
        CredentialsSignin: "Email ou mot de passe incorrect",
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true);

    // TODO : Create article

    setLoading(false);
    };  
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    return (
        <Card className="p-[32px] w-full sm:w-[500px] rounded-[24px] drop-shadow-lg m-4 md:m-0">
            <h1 className="text-[32px] font-bold mb-4 text-primary">Ecrire un article</h1>
            <Form {...form}>
                <form
                    className="space-y-4 w-full"
                    onSubmit={form.handleSubmit(onSubmit)}
                    >
                    <Formfield name="name" placeholder="Article" control={form.control} />
                    <FormField
                        control={form.control}
                        name="body"
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
