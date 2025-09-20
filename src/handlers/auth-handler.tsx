import { db } from "@/config/firebase.config";
import { LoaderPage } from "@/routes/loader-page";
import { User } from "@/types";
import { useAuth, useUser } from "@clerk/clerk-react";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AuthHanlder = () => {
  const { isSignedIn } = useAuth(); // Auth state
  const { user } = useUser(); // Current user info

  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storeUserData = async () => {
      if (isSignedIn && user) {
        setLoading(true);
        try {
          // Check if user exists in Firestore
          const userSanp = await getDoc(doc(db, "users", user.id));
          if (!userSanp.exists()) {
            // Create user object
            const userData: User = {
              id: user.id,
              name: user.fullName || user.firstName || "Anonymous",
              email: user.primaryEmailAddress?.emailAddress || "N/A",
              imageUrl: user.imageUrl,
              createdAt: serverTimestamp(),
              updateAt: serverTimestamp(),
            };

            // Save user in Firestore
            await setDoc(doc(db, "users", user.id), userData);
          }
        } catch (error) {
          console.log("Error on storing the user data : ", error);
        } finally {
          setLoading(false);
        }
      }
    };

    storeUserData();
  }, [isSignedIn, user, pathname, navigate]);

  if (loading) {
    return <LoaderPage />; // Show loader while saving user
  }

  return null;
};

export default AuthHanlder;
