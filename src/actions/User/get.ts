"use server";

import db from "@/utils/db";


export default async function getUser(id: string) {
    try {
        const user = await db.user.findUnique(
            {
                where: { Id: id }
            }
        );
        if (!user) {
            throw new Error("Not found");
        }

        return user;
    } catch (error) {
        throw new Error("Server error")
    }
}