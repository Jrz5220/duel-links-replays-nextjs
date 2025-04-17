// I dont know if this is the correct path for the 500 error page
// This could be a global error page if a directory does not contain an custom error.ts page

export default function Custom500() {
    return <h1>pages/500.js - Server error occured!</h1>
}