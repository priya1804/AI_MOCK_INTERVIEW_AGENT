import { FormMockInterview } from "@/components/form-mock-interview";
import { db } from "@/config/firebase.config";
import { Interview } from "@/types";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const CreateEditPage = () => {
  // Get the interviewId from the URL params (for editing existing interview)
  const { interviewId } = useParams<{ interviewId: string }>();

  // State to store the interview data fetched from Firestore
  const [interview, setInterview] = useState<Interview | null>(null);

  // Fetch interview data when interviewId changes
  useEffect(() => {
    const fetchInterview = async () => {
      if (interviewId) {
        try {
          // Get the document from Firestore
          const interviewDoc = await getDoc(doc(db, "interviews", interviewId));
          if (interviewDoc.exists()) {
            // Update state with fetched interview data
            setInterview({
              id: interviewDoc.id,
              ...interviewDoc.data(),
            } as Interview);
          }
        } catch (error) {
          console.log(error); // Log any errors while fetching
        }
      }
    };

    fetchInterview();
  }, [interviewId]);

  return (
    <div className="my-4 flex-col w-full">
      {/* Render the form component, passing initialData for editing */}
      <FormMockInterview initialData={interview} />
    </div>
  );
};
