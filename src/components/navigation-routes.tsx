import { MainRoutes } from "@/lib/helpers"; // Importing predefined navigation routes (array of route objects with href & label)
import { cn } from "@/lib/utils"; // Utility function for merging conditional class names
import { NavLink } from "react-router-dom"; // NavLink is used for navigation with active route styling

// Define the props type for NavigationRoutes component
interface NavigationRoutesProps {
  isMobile?: boolean; // Optional flag to adjust layout for mobile view
}

// NavigationRoutes component
export const NavigationRoutes = ({
  isMobile = false, // Default value is false (desktop view)
}: NavigationRoutesProps) => {
  return (
    <ul
      // Apply different styles depending on whether it's mobile or desktop
      className={cn(
        "flex items-center gap-6", // Default layout: horizontal with spacing
        isMobile && "items-start flex-col gap-8" // If mobile: vertical stack with more spacing
      )}
    >
      {/* Loop through each route in MainRoutes to create navigation links */}
      {MainRoutes.map((route) => (
        <NavLink
          key={route.href} // Unique key for each route
          to={route.href} // Path for navigation
          className={({ isActive }) =>
            cn(
              "text-base text-neutral-600", // Default text style
              isActive && "text-neutral-900 font-semibold" // Highlight active link
            )
          }
        >
          {route.label} {/* Display the route label as link text */}
        </NavLink>
      ))}
    </ul>
  );
};
