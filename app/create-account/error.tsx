"use client"

import { redirect } from "next/dist/server/api-utils"

export default function Error({ error }: { error: Error & {digest?: string} }) {
    return (
        <div>
            <h2>Something went very wrong!</h2>
            <p>Error: {error.message}</p>
        </div>
    )
}