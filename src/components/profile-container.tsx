import { useAuth, UserButton } from "@clerk/clerk-react"; // Clerk authentication hooks + user profile button
import { Loader } from "lucide-react"; // Loader spinner icon
import { Button } from "./ui/button"; // Reusable styled button component
import { Link } from "react-router-dom"; // Router link for navigation

// ProfileContainer component: handles user auth state in the header
export const ProfileContainer = () => {
  const { isSignedIn, isLoaded } = useAuth(); 
  // isSignedIn → true if user is logged in
  // isLoaded → true once Clerk finishes loading user state

  // Show a spinner while Clerk is still loading the user state
  if (!isLoaded) {
    return (
      <div className="flex items-center">
        <Loader className="min-w-4 min-h-4 animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <div className="flex items-center gap-6">
      {/* If the user is signed in → show Clerk's UserButton (profile dropdown) */}
      {isSignedIn ? (
        <UserButton afterSignOutUrl="/" /> // Redirect to home after sign out
      ) : (
        // If not signed in → show a "Get Started" button that links to /signin page
        <Link to={"/signin"}>
          <Button size={"sm"}>Get Started</Button>
        </Link>
      )}
    </div>
  );
};
