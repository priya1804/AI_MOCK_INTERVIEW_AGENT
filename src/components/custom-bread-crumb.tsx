// Custom Breadcrumb components
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Home icon from lucide-react
import { Home } from "lucide-react";

// React
import React from "react";


// Props for the custom breadcrumb component
interface CustomBreadCrumbProps {
  breadCrumbPage: string; // Current page to display as last item in breadcrumb
  breadCrumpItems?: { link: string; label: string }[]; // Optional intermediate breadcrumb items
}

export const CustomBreadCrumb = ({
  breadCrumbPage,
  breadCrumpItems,
}: CustomBreadCrumbProps) => {
  return (
    // Main breadcrumb container
    <Breadcrumb>
      <BreadcrumbList>
        {/* Home breadcrumb item */}
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/"
            className="flex items-center justify-center hover:text-emerald-500"
          >
            {/* Home icon */}
            <Home className="w-3 h-3 mr-2" />
            Home
          </BreadcrumbLink>
        </BreadcrumbItem>

        {/* Map through intermediate breadcrumb items if provided */}
        {breadCrumpItems &&
          breadCrumpItems.map((item, i) => (
            <React.Fragment key={i}>
              {/* Separator between breadcrumb items */}
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={item.link}
                  className="hover:text-emerald-500"
                >
                  {item.label}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          ))}

        {/* Separator before current page */}
        <BreadcrumbSeparator />

        {/* Current page displayed as non-clickable breadcrumb */}
        <BreadcrumbItem>
          <BreadcrumbPage>{breadCrumbPage}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};
