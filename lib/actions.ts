"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "./utils";
import { writeClient } from "@/sanity/lib/write-client";
import slugify from "slugify";

export const createPitch = async (state: any, form: FormData, pitch: string) => {
    const session = await auth();
    console.log("Session:", session)

    if(!session) return parseServerActionResponse({
        error: "Unauthorized",
        status: "ERROR",
    })

    try {
        const { title, description, category, link } = Object.fromEntries(Array.from(form).filter(([key]) => key !== "pitch"))

        if (!title || !description || !category || !link || !pitch) {
            return parseServerActionResponse({
                error: "All fields are required",
                status: "ERROR",
            })
        }

        const slug = slugify(title as string, { lower: true, strict: true })

        const startup = {
            _type: 'startup',
            title, 
            description, 
            category, 
            image: link,
            slug: {
                _type: "slug",
                current: slug,
            },
            author: {
                _type: "reference",
                _ref: session?.id,
            }, 
            pitch,
        }

        const result = await writeClient.create(startup)

        console.log(result)
        if (!result) {  
            throw new Error("Failed to create startup pitch")
        }

        return parseServerActionResponse({
            ...result,
            status: "SUCCESS",
        })

    } catch (error) {
        console.error(error)
        return parseServerActionResponse({
            error: "An unexpected error has occurred",
            status: "ERROR",
        })
    }
}