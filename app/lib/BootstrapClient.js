// https://1manstartup.com/blogs/install-bootstrap-for-nextjs-app-router

"use client"    // load the bootstrap JS only in the client and not the server

import { useEffect } from "react";

function BootstrapClient() {
    // Effects let you run some code after rendering a component so that you can synchronize your component with some system outside of React.
    // In this case, you want to import and apply the bootstrap JS file to your component after it renders on the client.
    // You can't do this on the server-side because the server only builds the components and handle events (update an input field, submit an HTTP POST request, or navigate the user to another screen).
    // However, some events have "side effects" that change the program's state, such as when a user clicks a button.
    // This is where you need Effects to handle side effects caused after the component has been rendered on the client side.
    // The side effect of bootstrap JS causes changes in the page layout.
    useEffect(() => {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
    }, []);
    return null;
}

export default BootstrapClient;