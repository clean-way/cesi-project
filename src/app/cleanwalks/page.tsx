"use client"
import { Card } from "@/components/common/Card";
import { Text } from "@/components/common/display/Texts";
import { useEffect, useState } from "react";
import { Articles, CleanWalk, Prisma } from "@prisma/client";
import CleanwalksList from "./CleanwalksList";
import Header from "@/components/common/Header";
import Hyperlink from "@/components/common/buttons/Hyperlink";

type CleanwalkWithParticipants = Prisma.CleanWalkGetPayload<{
    include: {
      cleanWalkParticipant: {
        select: {
          id: true;
          user: {
            select: {
              name: true;
              image: true;
              id: true;
            };
          };
        };
      };
    };
  }>;

async function getCleanwalks() : Promise<any>{
    try {
        const rawResponse = await fetch(`${process.env.NEXT_PUBLIC_NEXTAPI_URL}/cleanwalk`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!rawResponse.ok) {
            console.log(rawResponse);

            throw new Error('Failed to fetch data');
        }

        return await rawResponse.json();
    } catch (err) {
        throw err;
    }
}

export default function CleanwalksPage(){
    const [cleanwalks, setCleanwalks] = useState<Array<CleanwalkWithParticipants>>([]);
    
    useEffect(() => {
        getCleanwalks().then((value) => {
            console.log(value);
            setCleanwalks(value.cleanWalks);
        });
    }, []);
    
    return(
        <section className="bg-ct-blue-600 min-h-screen xl:py-10 xl:px-5">
            <Card className="mx-auto p-8 xl:p-12 h-full flex flex-col justify-center space-y-5">
                <div className="space-y-8">
                    <div className="flex flex-wrap justify-center xl:justify-start items-center gap-x-1">
                        <Text text="Vous voulez organiser une cleanwalk ?"/>
                        <Hyperlink text="C'est par ici !" href="/cleanwalks/create"/>
                    </div>
                    <div className="space-y-2">
                    <Text text="Cleanwalks de la semaine" variant="h4" fontWeight="semibold" />
                        <CleanwalksList cleanwalks={cleanwalks?.filter((x) => (new Date().getDay()- new Date(x.createdAt).getDay()) < 7) ?? []}/>
                    </div>
                </div>
            </Card>
        </section>
    );
}