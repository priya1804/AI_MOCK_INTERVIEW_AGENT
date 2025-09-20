import { cn } from "@/lib/utils"; // Utility for merging conditional class names
import { useAuth } from "@clerk/clerk-react"; // Clerk authentication hook (provides user info)
import { Container } from "./container"; // Wrapper component for consistent layout spacing
import { LogoContainer } from "./logo-container"; // Component to render the logo
import { NavigationRoutes } from "./navigation-routes"; // Navigation links (Home, About, etc.)
import { NavLink } from "react-router-dom"; // Router navigation link with active state support
import { ProfileContainer } from "./profile-container"; // Component for user profile/avatar
import { ToggleContainer } from "./toggle-container"; // Component for mobile menu toggle (hamburger)

// Header component
const Header = () => {
  const { userId } = useAuth(); // Get current logged-in user ID from Clerk

  return (
    <header
      // Main header container with border & smooth transition styles
      className={cn("w-full border-b duration-150 transition-all ease-in-out")}
    >
      <Container>
        <div className="flex items-center gap-4 w-full">
          {/* Logo Section */}
          <LogoContainer />

          {/* Navigation Section (hidden on small screens, visible on md+) */}
          <nav className="hidden md:flex items-center gap-3">
            {/* Main navigation links */}
            <NavigationRoutes />

            {/* Additional link only for logged-in users */}
            {userId && (
              <NavLink
                to={"/generate"} // Custom route
                className={({ isActive }) =>
                  cn(
                    "text-base text-neutral-600", // Default style
                    isActive && "text-neutral-900 font-semibold" // Active style
                  )
                }
              >
                Take An Interview
              </NavLink>
            )}
          </nav>

          {/* Right Side Section (aligned to end) */}
          <div className="ml-auto flex items-center gap-6">
            {/* Profile (avatar or login button depending on auth state) */}
            <ProfileContainer />

            {/* Mobile Menu Toggle (hamburger icon) */}
            <ToggleContainer />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
