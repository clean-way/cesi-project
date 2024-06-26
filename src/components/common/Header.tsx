"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { Text } from "@/components/common/display/Texts";
import Image from "next/image";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";

export default function Header() {
    const { data: session } = useSession()

    return (
        <div className="bg-white shadow h-16 flex items-center">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4 space-x-1">
                    <Link href="/">
                        <div className="flex justify-center items-center space-x-2"> 
                            <Image src='/cleanway.png' width={30} height={10} alt='Cleanway' />  
                            <div className="hidden xl:block">
                                <Text text="Cleanway" variant="h3"/>
                            </div>
                        </div>
                    </Link>
                    <div className="space-x-4">
                        <Link href="/cleanwalks">
                            Cleanways
                        </Link>
                        <Link href="/articles">
                            Articles
                        </Link>
                    </div>
                    <nav>
                        {!session?.user ? (
                        <ul className="flex space-x-4">
                            <li>
                                <Link href="/auth/signin">
                                    Sign in
                                </Link>
                            </li>
                            <li>
                                <Link href="/auth/signup">
                                    Register
                                </Link>
                            </li>
                        </ul>
                        ) : (
                        <ul className="flex space-x-4 items-center">
                            <li>
                                <p className="hidden xl:block">
                                    {session.user.email}
                                </p>
                            </li>
                            <li>
                                <Link href={`/profile/${session.user.id}`}>
                                    Profil
                                </Link>
                            </li>
                            <li>
                                <PrimaryButton onClick={() => signOut()}>
                                    Sign out
                                </PrimaryButton>
                            </li>
                        </ul>
                        )}

                    </nav>
                </div>
            </div>
        </div>
    );
}