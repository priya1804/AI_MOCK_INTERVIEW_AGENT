import { cn } from "@/lib/utils";

// Props for Headings component
interface HeadingsProps {
  title: string;             // The main heading text
  description?: string;      // Optional subtext or description
  isSubHeading?: boolean;    // If true, renders a smaller heading style
}

// Headings component: displays a title and optional description
export const Headings = ({
  title,
  description,
  isSubHeading = false,
}: HeadingsProps) => {
  return (
    <div>
      {/* Heading text */}
      <h2
        className={cn(
          "text-2xl md:text-3xl text-gray-800 font-semibold font-sans", // default heading style
          isSubHeading && "text-lg md:text-xl" // smaller style if isSubHeading is true
        )}
      >
        {title}
      </h2>

      {/* Optional description below heading */}
      {description && (
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
      )}
    </div>
  );
};
