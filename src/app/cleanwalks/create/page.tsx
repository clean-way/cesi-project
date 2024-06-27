import Header from "@/components/common/Header";
import { CleanwalkForm } from "./CleanwalkForm";

export default function CleanWalkCreationPage(){
    return (
        <div className="h-full w-full flex justify-center items-center xl:pt-12">
            <CleanwalkForm />
        </div>
    );
}