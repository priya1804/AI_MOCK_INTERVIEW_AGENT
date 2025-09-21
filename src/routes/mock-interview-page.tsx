/* eslint-disable @typescript-eslint/no-unused-vars */
import { Interview } from "@/types"; // Interview type interface
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"; // Routing hooks
import { LoaderPage } from "./loader-page"; // Loading UI
import { doc, getDoc } from "firebase/firestore"; // Firestore functions
import { db } from "@/config/firebase.config"; // Firestore config
import { CustomBreadCrumb } from "@/components/custom-bread-crumb"; // Breadcrumb UI

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // Shadcn alert UI
import { Lightbulb } from "lucide-react"; // Icon
import { QuestionSection } from "@/components/question-section"; // Component to display questions

// Main component for conducting a mock interview session
export const MockInterviewPage = () => {
  // Extract interviewId from route params
  const { interviewId } = useParams<{ interviewId: string }>();

  // State: interview data fetched from Firestore
  const [interview, setInterview] = useState<Interview | null>(null);

  // State: track loading spinner
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // Fetch interview details when page loads or when interviewId changes
  useEffect(() => {
    setIsLoading(true);

    const fetchInterview = async () => {
      if (interviewId) {
        try {
          // Fetch Firestore document using interviewId
          const interviewDoc = await getDoc(doc(db, "interviews", interviewId));

          // If interview exists, store it in state
          if (interviewDoc.exists()) {
            setInterview({
              id: interviewDoc.id,
              ...interviewDoc.data(),
            } as Interview);
          }
        } catch (error) {
          console.log(error); // Log errors for debugging
        } finally {
          setIsLoading(false); // Stop loader once request finishes
        }
      }
    };

    fetchInterview();
  }, [interviewId, navigate]);

  // Show loader while fetching data
  if (isLoading) {
    return <LoaderPage className="w-full h-[70vh]" />;
  }

  // Redirect if no interviewId present in URL
  if (!interviewId) {
    navigate("/generate", { replace: true });
  }

  // Redirect if interview not found
  if (!interview) {
    navigate("/generate", { replace: true });
  }

  return (
    <div className="flex flex-col w-full gap-8 py-5">
      {/* Breadcrumb navigation */}
      <CustomBreadCrumb
        breadCrumbPage="Start"
        breadCrumpItems={[
          { label: "Mock Interviews", link: "/generate" },
          {
            label: interview?.position || "",
            link: `/generate/interview/${interview?.id}`,
          },
        ]}
      />

      {/* Info alert: instructions for candidate */}
      <div className="w-full">
        <Alert className="bg-sky-100 border border-sky-200 p-4 rounded-lg flex items-start gap-3">
          <Lightbulb className="h-5 w-5 text-sky-600" />
          <div>
            <AlertTitle className="text-sky-800 font-semibold">
              Important Note
            </AlertTitle>
            <AlertDescription className="text-sm text-sky-700 mt-1 leading-relaxed">
              Press "Record Answer" to begin answering the question. Once you
              finish the interview, you&apos;ll receive feedback comparing your
              responses with the ideal answers.
              <br />
              <br />
              <strong>Note:</strong>{" "}
              <span className="font-medium">Your video is never recorded.</span>{" "}
              You can disable the webcam anytime if preferred.
            </AlertDescription>
          </div>
        </Alert>
      </div>

      {/* Render questions if available */}
      {interview?.questions && interview?.questions.length > 0 && (
        <div className="mt-4 w-full flex flex-col items-start gap-4">
          <QuestionSection questions={interview?.questions} />
        </div>
      )}
    </div>
  );
};
