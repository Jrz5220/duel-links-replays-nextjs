// This route is for testing only

import LoginForm from "../forms/login-form";

/*I dont think this component is ever used in the app.
The only time the login box should be referenced is in nav-links,
and nav-links references the login form directly instead of the login box.
 */
export default function LoginBox() {
    return(
        <main className="flex items-center justify-center">
            <LoginForm />
        </main>
    );
}