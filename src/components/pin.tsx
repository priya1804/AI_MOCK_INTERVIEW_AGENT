// ---------------------------- IMPORTS ----------------------------
import { Interview } from "@/types"; // Type definition for Interview object
import { useNavigate } from "react-router-dom"; // For programmatic navigation

// UI components
import {
  Card,
  CardDescription,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge"; // Small label/tag component
import { cn } from "@/lib/utils"; // Utility function for conditional classNames
import { TooltipButton } from "./tooltip-button"; // Custom button with tooltip

// Icons from lucide-react
import { Eye, Newspaper, Sparkles } from "lucide-react";

// ---------------------------- PROPS INTERFACE ----------------------------
interface InterviewPinProps {
  interview: Interview;     // The interview object data
  onMockPage?: boolean;     // Flag to check if it's displayed inside a mock interview page
}

// ---------------------------- COMPONENT ----------------------------
export const InterviewPin = ({
  interview,
  onMockPage = false, // Defaults to false if not provided
}: InterviewPinProps) => {
  const navigate = useNavigate(); // React Router navigation hook

  return (
    <Card
      className="p-4 rounded-md shadow-none hover:shadow-md shadow-gray-100 
      cursor-pointer transition-all space-y-4"
    >
      {/* Job Position Title */}
      <CardTitle className="text-lg">{interview?.position}</CardTitle>

      {/* Job Description */}
      <CardDescription>{interview?.description}</CardDescription>

      {/* Display tech stacks as badges */}
      <div className="w-full flex items-center gap-2 flex-wrap">
        {interview?.techStack.split(",").map((word, index) => (
          <Badge
            key={index}
            variant="outline"
            className="text-xs text-muted-foreground 
            hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-900"
          >
            {word}
          </Badge>
        ))}
      </div>

      {/* Footer Section - shows timestamp and actions */}
      <CardFooter
        className={cn(
          "w-full flex items-center p-0",
          onMockPage ? "justify-end" : "justify-between"
        )}
      >
        {/* Display interview creation date and time */}
        <p className="text-[12px] text-muted-foreground truncate whitespace-nowrap">
          {`${new Date(interview?.createdAt.toDate()).toLocaleDateString(
            "en-US",
            { dateStyle: "long" }
          )} - ${new Date(interview?.createdAt.toDate()).toLocaleTimeString(
            "en-US",
            { timeStyle: "short" }
          )}`}
        </p>

        {/* Action buttons (only shown if not on mock page) */}
        {!onMockPage && (
          <div className="flex items-center justify-center">
            {/* View button */}
            <TooltipButton
              content="View"
              buttonVariant="ghost"
              onClick={() => {
                navigate(`/generate/${interview?.id}`, { replace: true });
              }}
              disabled={false}
              buttonClassName="hover:text-sky-500"
              icon={<Eye />}
              loading={false}
            />

            {/* Feedback button */}
            <TooltipButton
              content="Feedback"
              buttonVariant="ghost"
              onClick={() => {
                navigate(`/generate/feedback/${interview?.id}`, {
                  replace: true,
                });
              }}
              disabled={false}
              buttonClassName="hover:text-yellow-500"
              icon={<Newspaper />}
              loading={false}
            />

            {/* Start interview button */}
            <TooltipButton
              content="Start"
              buttonVariant="ghost"
              onClick={() => {
                navigate(`/generate/interview/${interview?.id}`, {
                  replace: true,
                });
              }}
              disabled={false}
              buttonClassName="hover:text-sky-500"
              icon={<Sparkles />}
              loading={false}
            />
          </div>
        )}
      </CardFooter>
    </Card>
  );
};
