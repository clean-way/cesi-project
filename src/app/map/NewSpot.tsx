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

import { useState } from "react";
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AccessDifficulties } from "@prisma/client";

function NewSpot() {
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
        <Drawer>
  <DrawerTrigger
  className="absolute bottom-0 left-0 m-8 z-50 bg-white p-4 rounded-full shadow-lg"
  ><PlusIcon size={32} className="text-primary" /></DrawerTrigger>
  <DrawerContent>
    <DrawerHeader>
      <DrawerTitle>Ajouter un nouveau déchet</DrawerTitle>
    </DrawerHeader>
    <div className="p-4 pb-0">
      <Label htmlFor="picture">Photo du spot</Label>
      <Input id="picture" type="file" />
        <Label htmlFor="description">Description</Label>
        <Input id="description" type="text" />
        <Label htmlFor="type">Difficulté d&apos;accès</Label>
        <Select>
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
    </div>
    <DrawerFooter>
      <Button className="w-full">Ajouter</Button>
      <DrawerClose>
        <Button variant="outline" className="w-full">Annuler</Button>
      </DrawerClose>
    </DrawerFooter>
  </DrawerContent>
</Drawer>

    )
}

export default NewSpot;