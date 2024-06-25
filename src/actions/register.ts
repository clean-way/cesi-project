"use server";

import db from "@/utils/db";
import bcrypt from "bcryptjs";

export default async function register(email: string, password: string, name: string) {
    try {
        const findUser = await db.user.findFirst({
            where: { email: email }
        });

        if (findUser) {
            return {
                status: "error",
                message: "User already exists",
            };
        }

        const newUser = await db.user.create({
            data: {
                email: email,
                password: await bcrypt.hash(password, 10),
                name: name,
            }
        });

        if (!newUser) {
            return {
                status: "error",
                message: "An error occurred",
            };
        }

        return {
            status: "ok",
            message: "User created",
        };
    }
    catch (error: any) {
        return {
            status: "error",
            message: error.message,
        };
    }
}