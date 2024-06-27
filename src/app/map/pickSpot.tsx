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
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Prisma, Spot } from "@prisma/client";

type SpotWithTrash = Prisma.SpotGetPayload<{
    include: { spotTrash: { include: { trash: true } } };
  }>;

function PickSpot({ id, setSpot }: { id: string; setSpot: (spot: SpotWithTrash) => void }) {
    const [formData, setFormData] = useState({
        file: null as string | null,
        });

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value, files } = e.target;
            setFormData((prevData : any) => ({
                ...prevData,
                [name]: files ? files[0] : value,
            }));
        };

        const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const data = new FormData();
            for (const [key, value] of Object.entries(formData)) {
                data.append(key, value as string);
            }
            const res = await fetch(`/api/spot/${id}/clean`, {
                method: "POST",
                body: data,
            });
            if (res.ok) {
                const response = await res.json();
                setSpot(response.spot);
                alert("Spot picked successfully");
            } else {
                console.log(res);
                alert("An error occured");
            }
        }

    
  return (
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Zone de déchet</DrawerTitle>
        <DrawerDescription>Ajoutez une photo de la zone nettoyée</DrawerDescription>
      </DrawerHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-4">
            <Input type="file" name="file" onChange={handleChange} />
      <DrawerFooter className="flex justify-between p-0">
        <Button className="w-full" type="submit">Ramasser le déchet</Button>
        <DrawerClose>
          <Button variant="outline" className="w-full">Annuler</Button>
        </DrawerClose>
      </DrawerFooter>
      </form>
    </DrawerContent>
  );
}

export default PickSpot;
