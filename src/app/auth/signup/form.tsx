"use client";
import { Form } from "@/components/ui/form";
import { Card } from "@/components/common/Card";
import Formfield from "@/components/common/inputs/Formfield";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CheckboxWithText from "@/components/common/inputs/CheckboxWithText";
import { Loader2 } from "lucide-react";

import register from "@/actions/register";

import { signIn } from "next-auth/react";
import { useState } from "react";

const formSchema = z
  .object({
    firstname: z
      .string({ required_error: "Le prénom est requis." })
      .min(2, { message: "Le prénom doit faire plus de 2 caractères." })
      .max(50, { message: "Le prénom doit faire moins de 50 caractères." }),
    lastname: z
      .string({ required_error: "Le nom est requis." })
      .min(2, { message: "Le nom doit faire plus de 2 caractères." })
      .max(50, { message: "Le nom doit faire moins de 50 caractères." }),
    email: z
      .string({ required_error: "L'email est requis." })
      .email({ message: "L'email doit être valide." }),
    password: z
      .string({ required_error: "Le mot de passe est requis." })
      .regex(
        new RegExp(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
        ),
        {
          message: "Le mot de passe doit contenir au moins 8 caractères, avec au moins une lettre majuscule, une lettre minuscule et un chiffre."
        }
      ),
    confirmPassword: z.string({
      required_error: "La confirmation du mot de passe est requise.",
    }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Les mots de passe ne correspondent pas.",
        path: ["confirmPassword"],
      });
    }
  });

export const RegisterForm = () => {
  const [loading, setLoading] = useState(false);
  const [checked, setChecked] = useState<boolean>();
  const [error, setError] = useState<string>();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    try {
      const result = await register(
        values.email.toLowerCase().trim(),
        values.password,
        values.firstname + " " + values.lastname
      );

      setLoading(false);
      if (result.status === "error") {
        if(result.message === "User already exists") {
          setError("L'utilisateur existe déjà.");
          return;
        }

        setError("Une erreur s'est produite.");
        return;
      }

      signIn("credentials", {
        email: values.email,
        password: values.password,
        callbackUrl: "/",
      });
    } catch (error: any) {
      setError("Une erreur s'est produite.");
      setLoading(false);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <Card className="p-[32px] w-full sm:w-[500px] rounded-[24px] drop-shadow-lg m-4 md:m-0">
      <h1 className="text-[32px] font-bold mb-4 text-primary">
        S&apos;inscrire
      </h1>
      <Form {...form}>
        <form
          className="space-y-3 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="flex space-x-2 w-full">
            <Formfield
              name="lastname"
              placeholder="Nom"
              control={form.control}
            />
            <Formfield
              name="firstname"
              placeholder="Prénom"
              control={form.control}
            />
          </div>
          <Formfield name="email" placeholder="Email" control={form.control} />
          <Formfield
            name="password"
            placeholder="Mot de passe"
            control={form.control}
            type="password"
          />
          <Formfield
            name="confirmPassword"
            placeholder="Confirmer le mot de passe"
            control={form.control}
            type="password"
          />
          <CheckboxWithText
            text="J’accepte les termes et conditions"
            checked={checked}
            onCheckedChange={setChecked}
          />
          {
            error && (
              <div className="text-red-500 text-sm">
                {error}
              </div>
            )
          }
          <div className="space-y-1">
            <PrimaryButton
              fullwidth
              type="submit"
              disabled={loading || !checked}
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                "S'inscrire"
              )}
            </PrimaryButton>
            <div>
              <a href="/auth/signin">
                Déjà un compte ?{" "}
                <span className="text-primary underline">Se connecter</span>
              </a>
            </div>
          </div>
        </form>
      </Form>
    </Card>
  );
};
