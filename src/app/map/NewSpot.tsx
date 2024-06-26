import { useEffect, useState } from "react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AccessDifficulties, Spot } from "@prisma/client";
import { isArray } from "util";

function NewSpot({ position, trash, setTrash }: { position: [number, number] | null, trash: Spot[], setTrash: (trash: Spot[]) => void }) {
    const [open, setOpen] = useState(false)

    const [formData, setFormData] = useState({
      name: "",
      description: "",
      access: "",
      file: null,
      trashs: [{ name: "", quantity: "" }]
  });

  useEffect(() => {
    setFormData({
        name: "",
        description: "",
        access: "",
        file: null,
        trashs: [{ name: "", quantity: "" }]
    });
}
, [open]);

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
    
    const handleTrashChange = (index : number, e : React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const trashs = [...formData.trashs];
      trashs[index] = { ...trashs[index], [name]: value };
      setFormData({ ...formData, trashs });
  };

  const addTrash = () => {
    setFormData((prevData) => ({
        ...prevData,
        trashs: [...prevData.trashs, { name: "", quantity: "" }],
    }));
};

const removeTrash = (index : number) => {
    setFormData((prevData) => ({
        ...prevData,
        trashs: prevData.trashs.filter((_, i) => i !== index),
    }));
};

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, files } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: files ? files[0] : value,
        }));
    };

    const handleSelectChange = (name : string, value: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = new FormData();
        for (const [key, value] of Object.entries(formData)) {
          if (key === 'trashs') {
              if(isArray(value)) {
                  value.forEach((trash) => {
                      data.append('trashs', `${trash.name},${trash.quantity}`);
                  });
              }
        } else {
            data.append(key, value as string);
        }
        }

        data.append('longitude', position![0].toString());
        data.append('latitude', position![1].toString());

        const response = await fetch('/api/spot', {
            method: 'POST',
            body: data,
        });

        const result = await response.json();
        if (response.ok) {
            setTrash([...trash, result.spot]);
            setOpen(false);
            // Handle success (e.g., close drawer, reset form, etc.)
        } else {
            alert(result.message);
            // Handle error
        }
    };

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger className="absolute bottom-0 left-0 m-8 z-50 bg-white p-4 rounded-full shadow-lg">
                <PlusIcon size={32} className="text-primary" />
            </DrawerTrigger>
            <DrawerContent className="max-w-[1000px] mx-auto">
                <DrawerHeader>
                    <DrawerTitle>Ajouter un nouveau déchet</DrawerTitle>
                </DrawerHeader>
                <div className="p-4 pb-0">
                    <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
                        <Label htmlFor="name">Nom</Label>
                        <Input id="name" type="text" name="name" onChange={handleChange} />

                        <Label htmlFor="description">Description</Label>
                        <Input id="description" type="text" name="description" onChange={handleChange} />

                        <Label htmlFor="access">Difficulté d&apos;accès</Label>
                        <Select name="access" onValueChange={(value) => handleSelectChange('access', value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Sélectionner une difficulté d'accès" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Difficulté</SelectLabel>
                                    {Object.values(AccessDifficulties).map((value) => (
                                        <SelectItem key={value} value={value}>
                                            {difficultyMapper(value)}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        <Label htmlFor="file">Photo du spot</Label>
                        <Input id="file" type="file" name="file" onChange={handleChange} />

                        <Label htmlFor="trashs">Déchets</Label>
                        <div className="space-y-2">
                        {formData.trashs.map((trash, index) => (
                            <div key={index} className="flex items-center space-x-2">
                                <Input
                                    type="text"
                                    name="name"
                                    placeholder="Nom"
                                    value={trash.name}
                                    onChange={(e) => handleTrashChange(index, e)}
                                />
                                <Input
                                    type="number"
                                    name="quantity"
                                    placeholder="Quantité"
                                    value={trash.quantity}
                                    onChange={(e) => handleTrashChange(index, e)}
                                />
                                <Button type="button" onClick={() => removeTrash(index)} {...(formData.trashs.length === 1 ? { disabled: true } : {})} variant={"outline"}>
                                    -
                                </Button>
                            </div>
                        ))}
                        </div>
                        <Button type="button" onClick={addTrash} className="mt-2 w-fit self-end">
                            Ajouter un déchet
                        </Button>

                        <Button type="submit" className="w-full mt-4">Ajouter</Button>
                    </form>
                </div>
                <DrawerFooter>
                    <DrawerClose>
                        <Button variant="outline" className="w-full">Annuler</Button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}

export default NewSpot;
