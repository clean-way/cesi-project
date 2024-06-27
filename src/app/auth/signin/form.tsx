"use client";
import { signIn } from "next-auth/react";
import { ChangeEvent, useState, useEffect } from "react";
import { Form } from "@/components/ui/form";
import { Card } from "@/components/common/Card";
import Formfield from "@/components/common/inputs/Formfield";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import IconButton from "@/components/common/buttons/IconButton";
import { FaApple, FaGoogle } from "react-icons/fa6";
import CheckboxWithText from "@/components/common/inputs/CheckboxWithText";
import { Loader2 } from "lucide-react";

const formSchema = z.object({
  email: z
    .string({ required_error: "L'email est requis" })
    .email({ message: "L'email doit être valide" }),
  password: z.string({ required_error: "Le mot de passe est requis" }),
});

export const LoginForm = () => {
  const [loading, setLoading] = useState(false);
  const [loadingApple, setLoadingApple] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [error, setError] = useState("");
  const [callbackUrl, setCallbackUrl] = useState("");
  const [checked, setChecked] = useState<boolean>();

  const errors: { [key: string]: string } = {
    CredentialsSignin: "Email ou mot de passe incorrect",
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);

    const login = await signIn("credentials", {
      email: values.email,
      password: values.password,
      callbackUrl: callbackUrl || "/",
      redirect: false,
    });

    if (login && login.ok) {
      window.location.href = login.url!;
    } else if (login && login.error && errors[login.error]) {
      setError(errors[login.error]);
    } else {
      setError("Une erreur s'est produite");
    }

    setLoading(false);
  };  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <Card className="p-[32px] w-full sm:w-[500px] rounded-[24px] drop-shadow-lg m-4 md:m-0">
      <h1 className="text-[32px] font-bold mb-4 text-primary">Se connecter</h1>
      <Form {...form}>
        <form
          className="space-y-3 w-full"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Formfield name="email" placeholder="Email" control={form.control} />
          <Formfield
            name="password"
            placeholder="Mot de passe"
            control={form.control}
            type="password"
          />
          <CheckboxWithText
            text="Se souvenir de moi"
            checked={checked}
            onCheckedChange={setChecked}
          />
          {
            error && <div className="text-red-500 text-sm">{error}</div>
          }
          <div className="space-y-1">
            <PrimaryButton fullwidth type="submit" disabled={loading}>
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                "Se connecter"
              )}
            </PrimaryButton>
            <div>
              <a href="/auth/signup">
                Pas encore de compte ?{" "}
                <span className="text-primary underline">S&apos;inscrire</span>
              </a>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-px bg-gray-300 w-full"></div>
            <div className="text-gray-500">ou</div>
            <div className="h-px bg-gray-300 w-full"></div>
          </div>
          <div className="flex justify-center flex-col space-y-2">
            <IconButton
              Icon={FaApple}
              isLoading={loadingApple}
              disabled={loadingApple}
              iconSize={20}
              onClick={async () => {
                setLoadingApple(true);
                await signIn("apple", {
                  callbackUrl: callbackUrl || "/",
                });
                setLoadingApple(false);
              }}
              variant="outline"
              type="button"
            >
              {
                loadingApple ? " " : "Se connecter avec Apple"
              }
            </IconButton>
            <IconButton
              Icon={FaGoogle}
              iconSize={18}
              isLoading={loadingGoogle}
              disabled={loadingGoogle}
              onClick={async () => {
                setLoadingGoogle(true);
                await signIn("google", {
                  callbackUrl: callbackUrl || "/",
                });
                setLoadingGoogle(false);
              }}
              variant="outline"
              type="button"
            >
              {
                loadingGoogle ? " " : "Se connecter avec Google"
              }
            </IconButton>
          </div>
        </form>
      </Form>
    </Card>
  );
};
