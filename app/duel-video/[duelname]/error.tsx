"use client";

import { useEffect } from "react";
import MyErrorPage from "@/app/ui/error-page/my-error-page";

// this error page only renders when an error is thrown in /duel-video/[duelname] routes
export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;  // function to reset the error and re-render the route segment
}) {
    useEffect(() => {
        // Optionally log the error to an error reporting service
        console.error(error);
    }, [error]);

    let statusCode = 500; // default to 500 if no status code is provided

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

    return(
            <MyErrorPage errorCode={statusCode} errorMsg={error.message} />
    )
}