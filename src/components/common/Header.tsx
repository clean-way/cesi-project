"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Text } from "@/components/common/display/Texts";
import Image from "next/image";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";
import { MenuIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function Header() {
  const { data: session } = useSession();
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (open) {
            setOpen(false);
            }
        };
    
        document.addEventListener("click", handleClickOutside);
    
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }
    , [open]);

  return (
    <div className="bg-white shadow h-16 flex items-center">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link href="/" className="flex items-center space-x-2 cursor-pointer">
            <Image
              src="/logo_cleanway.svg"
              alt="Cleanway"
              width={30}
              height={30}
            />
            <span className="text-lg font-bold">Cleanway</span>
          </Link>
          <nav className="sm:flex hidden">
            {!session?.user ? (
              <ul className="flex space-x-4">
                <li>
                  <Link href="/auth/signin">Se connecter</Link>
                </li>
                <li>
                  <Link href="/auth/signup">S&apos;inscrire</Link>
                </li>
              </ul>
            ) : (
              <ul className="flex space-x-4 items-center">
                <li>
                  <Link href="/map">Carte</Link>
                </li>
                <li>
                  <Link href="/cleanwalks">Cleanwalk</Link>
                </li>
                <li>
                  <Link href="/articles">Articles</Link>
                </li>                
                <li>
                  <Link href={`/profile/${session.user.id}`}>Profil</Link>
                </li>
                <li>
                  <PrimaryButton onClick={() => signOut()}>
                    Se déconnecter
                  </PrimaryButton>
                </li>
              </ul>
            )}
          </nav>

          <div className="sm:hidden">
            <MenuIcon size={24} onClick={() => setOpen(!open)} className="cursor-pointer" />

            <div className="absolute top-16 right-0 bg-white shadow-lg p-2 w-full h-auto z-50 rounded-b-lg
            " style={{ display: open ? "block" : "none" }}>
              <ul className="flex flex-col space-y-2">
                {!session?.user ? (
                  <>
                    <li>
                      <Link href="/auth/signin">Se connecter</Link>
                    </li>
                    <div className="border-b border-gray-100"></div>
                    <li>
                      <Link href="/auth/signup">S&apos;inscrire</Link>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <Link href="/map">Carte</Link>
                    </li>
                    <div className="border-b border-gray-100"></div>
                    <li>
                      <Link href="/cleanwalks">Cleanwalk</Link>
                    </li>
                    <div className="border-b border-gray-100"></div>            
                    <li>
                      <Link href="/articles">Articles</Link>
                    </li>
                    <div className="border-b border-gray-100"></div>               
                    <li>
                      <Link href={`/profile/${session.user.id}`}>Profil</Link>
                    </li>
                    <div className="border-b border-gray-100"></div>    
                    <li className="flex justify-center">
                      <PrimaryButton onClick={() => signOut()}>
                        Se déconnecter
                      </PrimaryButton>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
