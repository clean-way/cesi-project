"use client";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { Form } from "@/components/ui/form";
import { Card } from "@/components/common/Card";
import Formfield from "@/components/common/inputs/Formfield";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Colors } from "@/styles/Colors";

let formSchema = z.object({
  username: z
    .string({ required_error: "Le nom d'utilisateur est requis" })
    .min(2, {
      message: "Le nom d'utilisateur doit faire plus de 2 caractères",
    }),
});

export const NewUserForm = () => {
  const { data: session, status, update } = useSession()
  const [loading, setLoading] = useState(false);

  if (session?.user.name) {
    window.location.href = "/";
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_NEXTAPI_URL}/user/${session?.user?.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: values.username,
            email: session?.user?.email,
          }),
        }
      );
      if (!response.ok) {
        console.log(response);

        throw new Error("Failed to fetch data");
      } else {
        update({ user: { name: values.username } });

        window.location.href = "/";
      }
    } catch (err) {
      console.log(err);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <Card className="p-[32px] w-full sm:w-[500px] rounded-[24px] drop-shadow-lg m-4 md:m-0">
      {session && !session.user?.name ? (
        <>
          <h1 className="text-[32px] font-bold mb-4 text-primary">Bienvenue</h1>
          <>
            <p className="text-[16px] text-gray-500 mb-4">
              Entrez votre nom d&apos;utilisateur pour continuer
            </p>
            <Form {...form}>
              <form
                className="space-y-3 w-full"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <Formfield
                  name="username"
                  placeholder="Nom d'utilisateur"
                  control={form.control}
                />
                <PrimaryButton fullwidth type="submit" disabled={loading}>
                  {loading ? (
                    <Loader2 className="w-6 h-6 animate-spin" />
                  ) : (
                    "Continuer"
                  )}
                </PrimaryButton>
              </form>
            </Form>
          </>
        </>
      ) : (
        <div className="flex justify-center items-center">
          <Loader2 className="w-12 h-12 animate-spin" color={Colors.Green} />
        </div>
      )}
    </Card>
  );
};
