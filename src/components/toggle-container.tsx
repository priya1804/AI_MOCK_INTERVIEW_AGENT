import {
  Sheet,         // Wrapper component for a sliding panel (drawer)
  SheetContent,  // Content inside the sheet (panel body)
  SheetHeader,   // Header section inside the sheet
  SheetTitle,    // Title element in the header
  SheetTrigger,  // Button/element that opens the sheet
} from "@/components/ui/sheet";

import { Menu } from "lucide-react"; // Menu (hamburger) icon
import { NavigationRoutes } from "./navigation-routes"; // Reusable navigation links
import { useAuth } from "@clerk/clerk-react"; // Clerk auth hook for user state
import { NavLink } from "react-router-dom"; // React Router link with active styles
import { cn } from "@/lib/utils"; // Utility for conditional class merging

// ToggleContainer component
export const ToggleContainer = () => {
  const { userId } = useAuth(); // Check if user is logged in

  return (
    <Sheet>
      {/* SheetTrigger is the button to open the mobile menu */}
      <SheetTrigger className="block md:hidden">
        {/* Only visible on mobile (hidden on md+) */}
        <Menu /> {/* Hamburger menu icon */}
      </SheetTrigger>

      {/* SheetContent is the sliding panel content */}
      <SheetContent>
        <SheetHeader>
          {/* Placeholder for a title/logo inside the drawer (currently empty) */}
          <SheetTitle />
        </SheetHeader>

        {/* Navigation links inside the mobile drawer */}
        <nav className="gap-6 flex flex-col items-start">
          {/* Main navigation links stacked vertically for mobile */}
          <NavigationRoutes isMobile />

          {/* Extra link visible only when user is logged in */}
          {userId && (
            <NavLink
              to={"/generate"} // Route for interview feature
              className={({ isActive }) =>
                cn(
                  "text-base text-neutral-600 ", // Default styling
                  isActive && "text-neutral-900 font-semibold" // Highlight active route
                )
              }
            >
              Take An Interview
            </NavLink>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
