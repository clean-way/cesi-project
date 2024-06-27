import Header from "@/components/common/Header";
import { CleanwalkForm } from "./CleanwalkForm";

export default function CleanWalkCreationPage(){
    return (
        <div className="h-[calc(100dvh-4rem)] w-full flex justify-center items-center">
            <CleanwalkForm />
        </div>
    );
}