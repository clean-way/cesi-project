import { Button } from "@/components/ui/button";
import { getServerSession } from "next-auth";
import Image from "next/image";

export default async function Home() {
  const session = await getServerSession();

  return (
    <>
    <main className="flex flex-col items-center justify-center h-[calc(100dvh-4rem)]">
      <h1 className="text-6xl font-bold text-center">Test CI/CD Démo</h1>
      <h1 className="text-6xl font-bold text-primary text-center">c&apos;est dans la poche !</h1>
      <Image src="/logo_cleanway.svg" alt="Cleanway" width={100} height={100} className="mt-8" />

      <div className="mt-8">
        {!session ? (
          <div className="flex space-x-4">
            <a href="/auth/signin">
              <Button variant={"outline"}>Se connecter</Button>
            </a>
            <a href="/auth/signup">
              <Button>S&apos;inscrire</Button>
            </a>
          </div>
        ) : (
          <a href="/map">
          <Button>Voir la carte</Button>
          </a>
        )}
      </div>
    </main>
    </>
  );
}
