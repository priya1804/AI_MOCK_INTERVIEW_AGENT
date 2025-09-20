import { Outlet } from "react-router-dom";

// Generate component acts as a layout wrapper for nested routes under /generate
// It provides consistent padding and layout styling for child components
export const Generate = () => {
  return (
    <div className="flex-col md:px-12">
      {/* Outlet renders the matched child route component here */}
      <Outlet />
    </div>
  );
};
