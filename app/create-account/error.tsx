"use client";

import MyErrorPage from "../ui/error-page/my-error-page";

export default function Error({ error }: { error: Error & {digest?: string} }) {
    let statusCode = 500;
    let errorCause = error.cause;
    if(errorCause) {
        if(typeof errorCause === "object") {
            if("status" in errorCause) {
                if(typeof errorCause.status === "number") {
                    statusCode = errorCause.status;
                }
            }
        }
    }
    return (
        <MyErrorPage errorCode={statusCode} errorMsg={error.message} />
    )
}