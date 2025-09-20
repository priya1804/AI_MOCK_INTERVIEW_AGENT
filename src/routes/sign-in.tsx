// Importing the SignIn component from Clerk, 
// which provides a prebuilt authentication UI for signing in users.
import { SignIn } from "@clerk/clerk-react";

// SignInPage component that renders the Clerk SignIn form.
// The `path` prop specifies the route where the sign-in component should be mounted.
export const SignInPage = () => {
  return (
    // Renders the Clerk SignIn UI at the "/signin" route.
    <SignIn path="/signin" />
  );
};
