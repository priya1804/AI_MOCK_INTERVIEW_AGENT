// Importing Outlet from react-router-dom, which is used as a placeholder 
// to render the matched child route inside this layout.
import { Outlet } from "react-router-dom";

// AuthenticationLayout component serves as a wrapper layout 
// for authentication-related pages (e.g., login, signup).
const AuthenticationLayout = () => {
  return (
    // Full-screen container that centers its content both vertically and horizontally.
    // `relative` is important because the background image is positioned absolutely inside it.
    <div className="w-screen h-screen overflow-hidden flex items-center justify-center relative">
      
      {/* Background image that covers the entire screen with reduced opacity */}
      <img
        src="/assets/img/bg.png"
        className="absolute w-full h-full object-cover opacity-20"
        alt="Background"
      />

      {/* Outlet will render the nested route's component (e.g., Login or Signup form) */}
      <Outlet />
    </div>
  );
};

// Exporting the layout so it can be used in the app's routing configuration.
export default AuthenticationLayout;
