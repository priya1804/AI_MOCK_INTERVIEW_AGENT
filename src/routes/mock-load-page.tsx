/* eslint-disable @typescript-eslint/no-unused-vars */
import { db } from "@/config/firebase.config"; // Firebase Firestore instance
import { Interview } from "@/types"; // Interview type definition
import { doc, getDoc } from "firebase/firestore"; // Firestore methods
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom"; // React Router hooks
import { LoaderPage } from "./loader-page"; // Loading spinner/page
import { CustomBreadCrumb } from "@/components/custom-bread-crumb"; // Breadcrumb component
import { Button } from "@/components/ui/button"; // Shadcn button
import { Lightbulb, Sparkles, WebcamIcon } from "lucide-react"; // Icons
import { InterviewPin } from "@/components/pin"; // Interview card/pin component
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"; // Shadcn alert component
import WebCam from "react-webcam"; // Webcam component

// Component to load and display a single interview before starting
export const MockLoadPage = () => {
  // Extract interviewId from route params
  const { interviewId } = useParams<{ interviewId: string }>();

  // Local state management
  const [interview, setInterview] = useState<Interview | null>(null); // Fetched interview data
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [isWebCamEnabled, setIsWebCamEnabled] = useState(false); // Webcam toggle state

  const navigate = useNavigate();

  // Fetch interview data from Firestore on component mount
  useEffect(() => {
    setIsLoading(true);

    const fetchInterview = async () => {
      if (interviewId) {
        try {
          // Fetch document from Firestore
          const interviewDoc = await getDoc(doc(db, "interviews", interviewId));

          // If document exists, set state
          if (interviewDoc.exists()) {
            setInterview({
              id: interviewDoc.id,
              ...interviewDoc.data(),
            } as Interview);
          }
        } catch (error) {
          console.log(error); // Log errors for debugging
        } finally {
          setIsLoading(false); // Stop loading regardless of success/failure
        }
      }
    };

    fetchInterview();
  }, [interviewId, navigate]);

  // If still loading, show loader page
  if (isLoading) {
    return <LoaderPage className="w-full h-[70vh]" />;
  }

  // Redirect back to /generate if no ID in params
  if (!interviewId) {
    navigate("/generate", { replace: true });
  }

  // Redirect if no interview found
  if (!interview) {
    navigate("/generate", { replace: true });
  }

  return (
    <div className="flex flex-col w-full gap-8 py-5">
      {/* Top section: breadcrumb + start button */}
      <div className="flex items-center justify-between w-full gap-2">
        <CustomBreadCrumb
          breadCrumbPage={interview?.position || ""}
          breadCrumpItems={[{ label: "Mock Interviews", link: "/generate" }]}
        />

        <Link to={`/generate/interview/${interviewId}/start`}>
          <Button size={"sm"}>
            Start <Sparkles />
          </Button>
        </Link>
      </div>

      {/* Show interview card if data is available */}
      {interview && <InterviewPin interview={interview} onMockPage />}

      {/* Information alert */}
      <Alert className="bg-yellow-100/50 border-yellow-200 p-4 rounded-lg flex items-start gap-3 -mt-3">
        <Lightbulb className="h-5 w-5 text-yellow-600" />
        <div>
          <AlertTitle className="text-yellow-800 font-semibold">
            Important Information
          </AlertTitle>
          <AlertDescription className="text-sm text-yellow-700 mt-1">
            Please enable your webcam and microphone to start the AI-generated
            mock interview. The interview consists of five questions. You’ll
            receive a personalized report based on your responses at the end.{" "}
            <br />
            <br />
            <span className="font-medium">Note:</span> Your video is{" "}
            <strong>never recorded</strong>. You can disable your webcam at any
            time.
          </AlertDescription>
        </div>
      </Alert>

      {/* Webcam preview section */}
      <div className="flex items-center justify-center w-full h-full">
        <div className="w-full h-[400px] md:w-96 flex flex-col items-center justify-center border p-4 bg-gray-50 rounded-md">
          {isWebCamEnabled ? (
            // Webcam component if enabled
            <WebCam
              onUserMedia={() => setIsWebCamEnabled(true)} // Successfully got permission
              onUserMediaError={() => setIsWebCamEnabled(false)} // User denied or error
              className="w-full h-full object-cover rounded-md"
            />
          ) : (
            // Placeholder icon if webcam disabled
            <WebcamIcon className="min-w-24 min-h-24 text-muted-foreground" />
          )}
        </div>
      </div>

      {/* Webcam toggle button */}
      <div className="flex items-center justify-center">
        <Button onClick={() => setIsWebCamEnabled(!isWebCamEnabled)}>
          {isWebCamEnabled ? "Disable Webcam" : "Enable Webcam"}
        </Button>
      </div>
    </div>
  );
};
