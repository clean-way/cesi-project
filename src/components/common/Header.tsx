"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import PrimaryButton from "@/components/common/buttons/PrimaryButton";

export default function Header() {
    const { data: session } = useSession()

    return (
        <div className="bg-white shadow h-16 flex items-center">
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center py-4">
                    <Link href="/">
                        CleanWay
                    </Link>
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
                                <p>
                                    {session.user.email}
                                </p>
                            </li>
                            <li>
                                <Link href="/dashboard">
                                    Dashboard
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