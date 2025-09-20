// ---------------------------- IMPORTS ----------------------------

// Zod for schema validation
import { z } from "zod";

// Resolver to integrate Zod with react-hook-form
import { zodResolver } from "@hookform/resolvers/zod";

// Form provider and hooks for react-hook-form
import { FormProvider, useForm } from "react-hook-form";

// Custom types
import { Interview } from "@/types";

// Custom components
import { CustomBreadCrumb } from "./custom-bread-crumb";
import { Headings } from "./headings";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

// Firebase imports for CRUD operations
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "@/config/firebase.config";

// Clerk authentication hook
import { useAuth } from "@clerk/clerk-react";

// React hooks
import { useEffect, useState } from "react";

// Navigation hook from react-router
import { useNavigate } from "react-router-dom";

// Toast notification library
import { toast } from "sonner";

// Icons from lucide-react
import { Loader, Trash2 } from "lucide-react";

// AI chat session for generating interview questions
import { chatSession } from "@/scripts";

// ---------------------------- TYPES & SCHEMA ----------------------------

// Props for FormMockInterview component
interface FormMockInterviewProps {
  initialData: Interview | null; // existing interview data for edit mode
}

// Zod schema for form validation
const formSchema = z.object({
  position: z.string().min(1, "Position is required").max(100, "Position must be 100 characters or less"),
  description: z.string().min(10, "Description is required"),
  experience: z.coerce.number().min(0, "Experience cannot be empty or negative"),
  techStack: z.string().min(1, "Tech stack must be at least a character"),
});

// Type inferred from schema
type FormData = z.infer<typeof formSchema>;

// ---------------------------- COMPONENT ----------------------------

export const FormMockInterview = ({ initialData }: FormMockInterviewProps) => {
  // Initialize form with react-hook-form
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema), // integrate Zod validation
    defaultValues: initialData || {},  // pre-fill form if editing
  });

  const { isValid, isSubmitting } = form.formState; // form state info
  const [loading, setLoading] = useState(false);    // loading state for AI request
  const navigate = useNavigate();                   // navigation after submit
  const { userId } = useAuth();                     // current signed-in user ID

  // Titles and breadcrumb logic
  const title = initialData ? initialData.position : "Create a new mock interview";
  const breadCrumpPage = initialData ? initialData?.position : "Create";
  const actions = initialData ? "Save Changes" : "Create";
  const toastMessage = initialData
    ? { title: "Updated..!", description: "Changes saved successfully..." }
    : { title: "Created..!", description: "New Mock Interview created..." };

  // ---------------------------- HELPER FUNCTIONS ----------------------------

  // Cleans AI-generated response to parse as JSON array
  const cleanAiResponse = (responseText: string) => {
    let cleanText = responseText.trim(); // trim spaces
    cleanText = cleanText.replace(/(json|```|`)/g, ""); // remove code block symbols or 'json'
    const jsonArrayMatch = cleanText.match(/\[.*\]/s); // extract JSON array from string

    if (jsonArrayMatch) {
      cleanText = jsonArrayMatch[0];
    } else {
      throw new Error("No JSON array found in response");
    }

    try {
      return JSON.parse(cleanText); // convert string to JSON array
    } catch (error) {
      throw new Error("Invalid JSON format: " + (error as Error)?.message);
    }
  };

  // Generates AI interview questions based on form data
  const generateAiResponse = async (data: FormData) => {
    const prompt = `
      As an experienced prompt engineer, generate a JSON array containing 5 technical interview questions along with detailed answers based on the following job information:

      Job Information:
      - Job Position: ${data?.position}
      - Job Description: ${data?.description}
      - Years of Experience Required: ${data?.experience}
      - Tech Stacks: ${data?.techStack}

      Each object must have fields "question" and "answer".
      Format strictly as an array of JSON objects without any additional labels or code blocks.
    `;

    const aiResult = await chatSession.sendMessage(prompt);
    return cleanAiResponse(aiResult.response.text());
  };

  // ---------------------------- FORM SUBMIT ----------------------------

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);

      if (initialData) {
        // UPDATE EXISTING INTERVIEW
        if (isValid) {
          const aiResult = await generateAiResponse(data);

          await updateDoc(doc(db, "interviews", initialData?.id), {
            questions: aiResult,
            ...data,
            updatedAt: serverTimestamp(),
          });

          toast(toastMessage.title, { description: toastMessage.description });
        }
      } else {
        // CREATE NEW INTERVIEW
        if (isValid) {
          const aiResult = await generateAiResponse(data);

          await addDoc(collection(db, "interviews"), {
            ...data,
            userId,
            questions: aiResult,
            createdAt: serverTimestamp(),
          });

          toast(toastMessage.title, { description: toastMessage.description });
        }
      }

      // Navigate back to dashboard
      navigate("/generate", { replace: true });
    } catch (error) {
      console.log(error);
      toast.error("Error..", { description: "Something went wrong. Please try again later" });
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------- EFFECTS ----------------------------

  // Reset form when editing existing interview
  useEffect(() => {
    if (initialData) {
      form.reset({
        position: initialData.position,
        description: initialData.description,
        experience: initialData.experience,
        techStack: initialData.techStack,
      });
    }
  }, [initialData, form]);

 

  return (
    <div className="w-full flex-col space-y-4">
      {/* Breadcrumb navigation */}
      <CustomBreadCrumb
        breadCrumbPage={breadCrumpPage}
        breadCrumpItems={[{ label: "Mock Interviews", link: "/generate" }]}
      />

      {/* Heading and optional delete button */}
      <div className="mt-4 flex items-center justify-between w-full">
        <Headings title={title} isSubHeading />
        {initialData && (
          <Button size={"icon"} variant={"ghost"}>
            <Trash2 className="min-w-4 min-h-4 text-red-500" />
          </Button>
        )}
      </div>

      <Separator className="my-4" />

      {/* Form for creating/editing interview */}
      <FormProvider {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full p-8 rounded-lg flex-col flex items-start justify-start gap-6 shadow-md"
        >
          {/* Position Field */}
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem className="w-full space-y-4">
                <div className="w-full flex items-center justify-between">
                  <FormLabel>Job Role / Job Position</FormLabel>
                  <FormMessage className="text-sm" />
                </div>
                <FormControl>
                  <Input
                    className="h-12"
                    disabled={loading}
                    placeholder="eg:- Full Stack Developer"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Description Field */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full space-y-4">
                <div className="w-full flex items-center justify-between">
                  <FormLabel>Job Description</FormLabel>
                  <FormMessage className="text-sm" />
                </div>
                <FormControl>
                  <Textarea
                    className="h-12"
                    disabled={loading}
                    placeholder="eg:- Describe your job role"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Experience Field */}
          <FormField
            control={form.control}
            name="experience"
            render={({ field }) => (
              <FormItem className="w-full space-y-4">
                <div className="w-full flex items-center justify-between">
                  <FormLabel>Years of Experience</FormLabel>
                  <FormMessage className="text-sm" />
                </div>
                <FormControl>
                  <Input
                    type="number"
                    className="h-12"
                    disabled={loading}
                    placeholder="eg:- 5 Years"
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Tech Stack Field */}
          <FormField
            control={form.control}
            name="techStack"
            render={({ field }) => (
              <FormItem className="w-full space-y-4">
                <div className="w-full flex items-center justify-between">
                  <FormLabel>Tech Stacks</FormLabel>
                  <FormMessage className="text-sm" />
                </div>
                <FormControl>
                  <Textarea
                    className="h-12"
                    disabled={loading}
                    placeholder="eg:- React, Typescript..."
                    {...field}
                    value={field.value || ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Action Buttons */}
          <div className="w-full flex items-center justify-end gap-6">
            <Button
              type="reset"
              size={"sm"}
              variant={"outline"}
              disabled={isSubmitting || loading}
            >
              Reset
            </Button>
            <Button
              type="submit"
              size={"sm"}
              disabled={isSubmitting || !isValid || loading}
            >
              {loading ? <Loader className="text-gray-50 animate-spin" /> : actions}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};