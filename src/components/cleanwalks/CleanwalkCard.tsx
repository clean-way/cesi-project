import { Card, CardContent, CardHeader } from "../common/Card";
import { Text } from "@/components/common/display/Texts";
import { CleanWalk, Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { useSession } from "next-auth/react";
import UserAvatar from "../common/display/UserAvatar";

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

export default function CleanwalkCard({
  cleanwalk,
  fullSize,
}: {
  cleanwalk: CleanwalkWithParticipants;
  fullSize?: boolean;
}) {
  const startDate = new Date(cleanwalk.startAt);
  startDate.setHours(startDate.getHours() + 2);
  const endDate = new Date(cleanwalk.endAt);
  endDate.setHours(endDate.getHours() + 2);

  const session = useSession();

    const joinCleanwalk = async (id: string) => {
        try {
            const rawResponse = await fetch(`${process.env.NEXT_PUBLIC_NEXTAPI_URL}/cleanwalk/${id}/join`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (!rawResponse.ok) {
                console.log(rawResponse);

                throw new Error('Failed to fetch data');
            }

            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }

  const formattedDate = `${startDate.toTimeString().slice(0, 5)} à ${endDate
    .toTimeString()
    .slice(0, 5)}`;
  return (
    <Link
      href={`/cleanwalks/${cleanwalk.id}`}
      className={`${!fullSize ? "xl:w-[20%] xl:min-w-[20%]" : ""} w-full`}
    >
      <Card>
        <CardHeader className="p-0">
          {cleanwalk.bannerImage ? (
            <Image
              src={cleanwalk.bannerImage}
              width={0}
              height={0}
              className={`rounded-t-lg`}
              style={{
                objectFit: "cover",
                width: "100%",
                height: fullSize ? 200 : 140,
              }}
              alt={cleanwalk.name}
              sizes="100vw"
            />
          ) : (
            <div className="flex justify-center justify-start items-center space-x-2 py-2 h-[140px]">
              <Image
                src="/logo_cleanway.svg"
                alt="Cleanway"
                width={30}
                height={30}
              />
              <Text text="Cleanway" variant="h2" />
            </div>
          )}
        </CardHeader>
        <CardContent className="flex flex-col pt-4">
          <div className="flex flex-col xl:flex-row xl:justify-between">
            <Text text={cleanwalk.name} fontWeight="bold" />
          </div>
          <Text text={cleanwalk.description} />
          {cleanwalk.cleanWalkParticipant ? (
            <div>
              <h2 className="text-ct-blue-600 font-bold mt-2">Participants ({cleanwalk.cleanWalkParticipant.length})</h2>
              {cleanwalk.cleanWalkParticipant.length > 0 ? (
                <ul className="space-y-2">
                  {cleanwalk.cleanWalkParticipant.map((participant) => (
                    <li key={participant.id} className="flex items-center space-x-2">
                      {participant.user.image ? (
                        <Image
                        src={participant.user.image!}
                        width={30}
                        height={30}
                        className="rounded-full"
                        alt={participant.user.name!}
                        />
                        ) : (
                            <div className="size-[30px]">
                                <UserAvatar username={participant.user.name!} source={participant.user.image ?? ''} />
                            </div>
                        )}
                        <Text text={participant.user.name!} />
                    </li>
                  ))}
                </ul>
              ) : (
                <Text text="Aucun participant pour le moment" variant="small" />
              )}

              <Button className="mt-2" onClick={() => joinCleanwalk(cleanwalk.id)} disabled={cleanwalk.cleanWalkParticipant.map(x => x.user.id).includes(session?.data?.user.id!)}>{
                    cleanwalk.cleanWalkParticipant.map(x => x.user.id).includes(session?.data?.user.id!) ? "Vous participez déjà" : "Participer"
                }</Button>
            </div>
          ) : null}
          <div className="flex justify-between pt-4">
            <Text text={formattedDate} variant="small" />
            <Text text={startDate.toLocaleDateString()} variant="small" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
