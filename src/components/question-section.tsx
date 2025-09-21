import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { TooltipButton } from "./tooltip-button";
import { Volume2, VolumeX } from "lucide-react";
import { RecordAnswer } from "./record-answer";

interface QuestionSectionProps {
  // Array of questions with an optional prefilled answer
  questions: { question: string; answer: string }[];
}

export const QuestionSection = ({ questions }: QuestionSectionProps) => {
  // State to track if text-to-speech is currently playing
  const [isPlaying, setIsPlaying] = useState(false);

  // State to toggle between webcam and non-webcam mode for answers
  const [isWebCam, setIsWebCam] = useState(false);

  // Holds the currently active speech utterance (for stopping mid-way)
  const [currentSpeech, setCurrentSpeech] =
    useState<SpeechSynthesisUtterance | null>(null);

  // Handles playing/pausing the spoken version of a question
  const handlePlayQuestion = (qst: string) => {
    if (isPlaying && currentSpeech) {
      // If speech is already playing → stop/cancel it
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setCurrentSpeech(null);
    } else {
      // Start speech only if the browser supports speech synthesis
      if ("speechSynthesis" in window) {
        const speech = new SpeechSynthesisUtterance(qst); // Create new utterance
        window.speechSynthesis.speak(speech); // Start speaking
        setIsPlaying(true);
        setCurrentSpeech(speech);

        // Reset state when the speech ends
        speech.onend = () => {
          setIsPlaying(false);
          setCurrentSpeech(null);
        };
      }
    }
  };

  return (
    <div className="w-full min-h-96 border rounded-md p-4">
      {/* Tabs component to navigate between questions */}
      <Tabs
        defaultValue={questions[0]?.question} // Default tab is the first question
        className="w-full space-y-12"
        orientation="vertical"
      >
        {/* Tab headers (Question #1, Question #2, etc.) */}
        <TabsList className="bg-transparent w-full flex flex-wrap items-center justify-start gap-4">
          {questions?.map((tab, i) => (
            <TabsTrigger
              className={cn(
                "data-[state=active]:bg-emerald-200 data-[state=active]:shadow-md text-xs px-2"
              )}
              key={tab.question}
              value={tab.question}
            >
              {`Question #${i + 1}`}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tab content for each question */}
        {questions?.map((tab, i) => (
          <TabsContent key={i} value={tab.question}>
            {/* Display the question text */}
            <p className="text-base text-left tracking-wide text-neutral-500">
              {tab.question}
            </p>

            {/* Button to play/stop the question via text-to-speech */}
            <div className="w-full flex items-center justify-end">
              <TooltipButton
                content={isPlaying ? "Stop" : "Start"} // Tooltip text
                icon={
                  isPlaying ? (
                    <VolumeX className="min-w-5 min-h-5 text-muted-foreground" />
                  ) : (
                    <Volume2 className="min-w-5 min-h-5 text-muted-foreground" />
                  )
                }
                onClick={() => handlePlayQuestion(tab.question)}
              />
            </div>

            {/* Component for recording user’s answer (text, voice, or video) */}
            <RecordAnswer
              question={tab}
              isWebCam={isWebCam}
              setIsWebCam={setIsWebCam}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
