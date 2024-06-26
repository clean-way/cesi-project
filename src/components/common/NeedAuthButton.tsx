"use client"
import { useRouter } from "next/navigation";
import PrimaryButton from "./buttons/PrimaryButton";
import { Text } from "@/components/common/display/Texts";
import Header from "./Header";

export default function NeedAuthButton(){
    const router = useRouter();
    return(
        <>
            <Header />
            <div className="size-full flex flex-col justify-center items-center text-center pt-12 px-8 space-y-3">
                <Text text={'Vous devez être authentifier pour accéder à ceci'}/>
                <PrimaryButton onClick={() => {router.push('/auth/signin')}}>
                    S'authentifier
                </PrimaryButton>
            </div>        
        </>
    );
}