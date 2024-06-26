import { Prisma, Spot } from "@prisma/client";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import PickSpot from "./pickSpot";
import { H2 } from "@/components/common/display/Texts";

type SpotWithTrash = Prisma.SpotGetPayload<{
  include: { spotTrash: { include: { trash: true } } };
}>;

function SpotDetails({ spot, setSpot }: { spot: SpotWithTrash; setSpot: (spot: SpotWithTrash) => void }) {

  const difficultyMapper = (value: string) => {
    switch (value) {
        case "NONE":
            return "Aucune";
        case "BOAT":
            return "En bateau";
        case "MOUNTAIN":
            return "En montagne";
        case "FEETONLY":
            return "À pied";
        default:
            return "Inconnu";
    }
}

  return (
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Zone de déchet</DrawerTitle>
        <DrawerDescription>{spot.description}</DrawerDescription>
      </DrawerHeader>
      <div className="p-4">
      <Image
          src={spot.startPhotoUri}
          alt="Spot photo"
          width={300}
          height={200}
        />
        <div>
          <H2>Difficulté d&apos;accès :</H2>
          <p>{difficultyMapper(spot.access)}</p>
        </div>
        <div>
          <h2>Déchets :</h2>
          <ul>
            {spot.spotTrash.map((trash) => (
              <li key={trash.id}>
                {trash.quantityLeft} - {trash.trash.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <DrawerFooter>
        {spot.completeCleaningAt ? (
          <div>
            Ramassé le {new Date(spot.completeCleaningAt).toLocaleDateString()} à {new Date(spot.completeCleaningAt).toLocaleTimeString()} :
            <Image
              src={spot.endPhotoUri as string}
              alt="Spot photo"
              width={300}
              height={200}
            />
          </div>
        ) : (
          <Drawer>
            <DrawerTrigger>
              <Button className="w-full">Ramasser</Button>
            </DrawerTrigger>
            <PickSpot id={spot.id} setSpot={setSpot} />
          </Drawer>
        )}
        <DrawerClose>
          <Button variant="outline" className="w-full">Fermer</Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  );
}

export default SpotDetails;
