import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button, buttonVariants } from "@/components/ui/button";
import { Loader } from "lucide-react";
import type { VariantProps } from "class-variance-authority";

// Use ShadCN's built-in variant typing for safety
type ButtonVariant = VariantProps<typeof buttonVariants>["variant"];

interface TooltipButtonProps {
  content: string; // Text shown inside tooltip
  icon: React.ReactNode; // Icon to display inside the button
  onClick: () => void; // Button click handler
  buttonVariant?: ButtonVariant; // Style variant of button (default/ghost/etc.)
  buttonClassName?: string; // Extra CSS classes for customization
  delay?: number; // Tooltip show delay in ms
  disabled?: boolean; // Disable button (prevents click + dims style)
  loading?: boolean; // Show spinner instead of icon when true
}

export const TooltipButton = ({
  content,
  icon,
  onClick,
  buttonVariant = "ghost", // Default to ghost variant
  buttonClassName = "",
  delay = 0, // No delay by default
  disabled = false,
  loading = false,
}: TooltipButtonProps) => {
  return (
    // TooltipProvider controls timing/behavior of tooltips
    <TooltipProvider delayDuration={delay}>
      <Tooltip>
        {/* TooltipTrigger defines what element triggers the tooltip */}
        <TooltipTrigger asChild>
          <Button
            size="icon" // Small square icon-only button
            disabled={disabled} // Disable if prop is true
            variant={buttonVariant} // Apply chosen style variant
            className={buttonClassName} // Allow extra custom styling
            // Prevent firing onClick when disabled or loading
            onClick={!disabled && !loading ? onClick : undefined}
          >
            {/* Show loader when loading, else show icon */}
            {loading ? (
              <Loader className="w-4 h-4 animate-spin text-emerald-400" />
            ) : (
              <span className="w-4 h-4">{icon}</span>
            )}
          </Button>
        </TooltipTrigger>

        {/* Tooltip text (hidden if disabled) */}
        {!disabled && (
          <TooltipContent>
            <p>{loading ? "Loading..." : content}</p>
          </TooltipContent>
        )}
      </Tooltip>
    </TooltipProvider>
  );
};
