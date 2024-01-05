"use server"

import { revalidatePath } from "next/cache";
import prisma from "./db";


export async function onSubmit(formData: FormData) {
    const name: string = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!name || !email || !password) {
        throw new Error("Please fill all fields");
    }

    const createdUser = await prisma.user.create({
        data: {
            email: email,
            password: password,
            name: name,
        }
    })

    revalidatePath("/")
}


export async function saveStory(formData: FormData) {

    const title: string = formData.get("title") as string;
    const body = formData.get("body") as string;
    const userId = formData.get("userId") as string;

    console.log(userId, title, body)

    if (!title || !body || !userId) {
        throw new Error("Please fill all fields");
    }

    const user = prisma.user.findUnique({
        where: {
            id: parseInt(userId)
        }
    })

    if (!user) {
        throw new Error("User not found");
    }

    const article = await prisma.article.create({
        data: {
            title: title,
            body: body,
            author: {
                connect: {
                    id: parseInt(userId)
                }
            }
        }
    });

    console.log(article);

}