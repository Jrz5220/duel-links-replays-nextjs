import MyErrorPage from "@/app/ui/error-page/my-error-page"

export default function Error({ error }: { error: Error & {digest?: string} }) {
    let statusCode = 500; // default to 500 if no status code is provided
    
    // Check if the error object has a status property and if it's a number
    if("status" in error) {
        if(typeof error.status === "number") {
            statusCode = error.status;
        }
    }

    return (
        <MyErrorPage errorCode={statusCode} errorMsg={error.message} />
    )
}