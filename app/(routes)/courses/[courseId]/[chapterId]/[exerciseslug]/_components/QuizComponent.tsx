"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CourseExercise } from "../page";
import { CheckCircle2, XCircle } from "lucide-react";

type Props = {
  courseExerciseData: CourseExercise | undefined;
  nextExerciseRoute: string | undefined;
};

type QuizQuestion = {
  question: string;
  options: string[];
  correctAnswer: number;
};

export default function QuizComponent({ courseExerciseData, nextExerciseRoute }: Props) {
  const { exerciseslug } = useParams();
  const router = useRouter();
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const exerciseIndex = courseExerciseData?.exercises?.findIndex((item) => item.slug === exerciseslug) ?? 0;
  const isCompleted = !!courseExerciseData?.completedExercise?.find(
    (item) => item?.exerciseId === Number(exerciseIndex) + 1
  );

  // Extract quiz from exercisesContent, or use fallback mock quiz questions for development
  const quizData: QuizQuestion[] = courseExerciseData?.exerciseData?.exercisesContent?.quiz || [
    {
      question: "Which of the following represents a key concept of this lesson?",
      options: ["Concept A", "Concept B", "Concept C", "Concept D"],
      correctAnswer: 1,
    },
    {
      question: "What is the primary benefit of completing interactive exercises?",
      options: ["Practice makes perfect", "Earning XP points", "Unlocking new badges", "All of the above"],
      correctAnswer: 3,
    }
  ];

  const currentQuestion = quizData[currentQuestionIdx];

  useEffect(() => {
    // Reset state on exercise change
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  }, [exerciseslug]);

  const handleOptionSelect = (optionIdx: number) => {
    if (isAnswered) return;
    setSelectedOption(optionIdx);
    setIsAnswered(true);

    if (optionIdx === currentQuestion.correctAnswer) {
      setScore((prev) => prev + 1);
      toast.success("Correct Answer!");
    } else {
      toast.error("Incorrect Answer. Try to study the instructions!");
    }
  };

  const handleNext = () => {
    if (currentQuestionIdx < quizData.length - 1) {
      setCurrentQuestionIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setQuizFinished(true);
    }
  };

  const onCompleteExercise = async () => {
    setLoadingSubmit(true);
    try {
      await axios.post("/api/exercise/complete", {
        courseId: courseExerciseData?.courseId,
        chapterId: courseExerciseData?.chapterId,
        exerciseId: exerciseIndex + 1,
        xpEarned: courseExerciseData?.exercises[exerciseIndex]?.xp || 50,
      });

      toast.success("Quiz Completed! XP Awarded.");
      router.push(nextExerciseRoute ?? "#");
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit quiz progress.");
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <div className="h-[90vh] bg-zinc-900 border-l-4 border-black p-8 flex flex-col justify-between overflow-y-auto font-mono text-white">
      <div>
        <div className="flex justify-between items-center mb-6 font-game text-xl text-yellow-400">
          <span>Interactive Quiz</span>
          <span>
            Question {currentQuestionIdx + 1} of {quizData.length}
          </span>
        </div>

        {/* Quiz Progress Bar */}
        <div className="w-full bg-zinc-800 h-4 border-2 border-black mb-8 rounded-lg overflow-hidden">
          <div
            className="bg-yellow-400 h-full transition-all duration-300"
            style={{ width: `${((currentQuestionIdx + (isAnswered ? 1 : 0)) / quizData.length) * 100}%` }}
          />
        </div>

        {!quizFinished ? (
          <div className="space-y-6">
            <h3 className="text-2xl font-game leading-relaxed border-2 border-dashed border-zinc-700 p-4 bg-zinc-850 rounded-xl">
              {currentQuestion?.question}
            </h3>

            <div className="grid gap-4 mt-6">
              {currentQuestion?.options.map((option, idx) => {
                let btnStyle = "border-black hover:bg-zinc-800 bg-zinc-850 text-white";
                let icon = null;

                if (isAnswered) {
                  if (idx === currentQuestion.correctAnswer) {
                    btnStyle = "bg-green-950/80 border-green-500 text-green-200 shadow-[0_0_10px_rgba(34,197,94,0.3)]";
                    icon = <CheckCircle2 className="h-6 w-6 text-green-500 shrink-0" />;
                  } else if (selectedOption === idx) {
                    btnStyle = "bg-red-950/80 border-red-500 text-red-200";
                    icon = <XCircle className="h-6 w-6 text-red-500 shrink-0" />;
                  } else {
                    btnStyle = "opacity-40 border-black bg-zinc-850";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    disabled={isAnswered}
                    className={`flex items-center justify-between p-5 border-4 rounded-xl text-left font-game text-2xl transition-all cursor-pointer ${btnStyle} active:translate-y-[2px] active:shadow-none`}
                  >
                    <span>{option}</span>
                    {icon}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-12 space-y-6 border-4 border-yellow-400 bg-zinc-800 rounded-2xl shadow-[6px_6px_0_0_#000] p-6 max-w-lg mx-auto">
            <h3 className="font-game text-4xl text-yellow-400">Quiz Completed!</h3>
            <p className="font-game text-2xl text-gray-300">
              You scored {score} out of {quizData.length} questions correctly!
            </p>
            <p className="font-game text-xl text-green-400">
              Claim your +{courseExerciseData?.exercises[exerciseIndex]?.xp || 50} XP points!
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-end mt-6">
        {!quizFinished ? (
          <Button
            variant="pixel"
            disabled={!isAnswered}
            onClick={handleNext}
            className={`font-game text-2xl px-8 py-6 bg-yellow-400 text-black hover:bg-yellow-300 ${!isAnswered ? "opacity-50" : ""}`}
          >
            {currentQuestionIdx === quizData.length - 1 ? "Finish Quiz" : "Next Question"}
          </Button>
        ) : (
          <Button
            variant={isCompleted ? "pixelDisabled" : "pixel"}
            onClick={isCompleted ? undefined : onCompleteExercise}
            disabled={loadingSubmit}
            className={`font-game text-2xl px-8 py-6 ${isCompleted ? "" : "bg-[#a3e534] text-black hover:bg-[#bbf255]"}`}
          >
            {isCompleted ? "Already Submitted" : loadingSubmit ? "Submitting..." : "Submit & Claim XP"}
          </Button>
        )}
      </div>
    </div>
  );
}
