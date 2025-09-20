// Importing the SignUp component from Clerk,
// which provides a prebuilt authentication UI for registering new users.
import { SignUp } from "@clerk/clerk-react";

// SignUpPage component that renders the Clerk SignUp form.
// The `path` prop specifies the route where the sign-up component should be mounted.
export const SignUpPage = () => {
  return (
    // Renders the Clerk SignUp UI at the "/signup" route.
    <SignUp path="/signup" />
  );
};
