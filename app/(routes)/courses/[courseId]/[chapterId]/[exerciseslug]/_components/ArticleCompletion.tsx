"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { CourseExercise } from "../page";
import Image from "next/image";

type Props = {
  courseExerciseData: CourseExercise | undefined;
  nextExerciseRoute: string | undefined;
};

export default function ArticleCompletion({ courseExerciseData, nextExerciseRoute }: Props) {
  const { exerciseslug } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const exerciseIndex = courseExerciseData?.exercises?.findIndex((item) => item.slug === exerciseslug) ?? 0;
  const isCompleted = !!courseExerciseData?.completedExercise?.find(
    (item) => item?.exerciseId === Number(exerciseIndex) + 1
  );

  const onCompleteExercise = async () => {
    setLoading(true);
    try {
      await axios.post("/api/exercise/complete", {
        courseId: courseExerciseData?.courseId,
        chapterId: courseExerciseData?.chapterId,
        exerciseId: exerciseIndex + 1,
        xpEarned: courseExerciseData?.exercises[exerciseIndex]?.xp || 50,
      });

      toast.success("Lesson Completed! XP Awarded.");
      router.push(nextExerciseRoute ?? "#");
    } catch (error) {
      console.error(error);
      toast.error("Failed to complete lesson.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[90vh] bg-zinc-900 border-l-4 border-black p-10 flex flex-col items-center justify-between font-mono text-white text-center">
      <div className="flex-1 flex flex-col items-center justify-center space-y-8 max-w-md">
        <div className="relative border-4 border-black rounded-2xl bg-zinc-800 p-8 shadow-[8px_8px_0_0_#000]">
          <div className="flex justify-center mb-6">
            <div className="h-24 w-24 bg-zinc-900 border-4 border-black rounded-full flex items-center justify-center animate-bounce shadow-[2px_2px_0_0_#000]">
              <Image src="/book.png" alt="Book Icon" width={50} height={50} />
            </div>
          </div>

          <h3 className="font-game text-4xl text-yellow-400 mb-4">Reading Lesson</h3>
          <p className="font-game text-xl text-gray-300 leading-relaxed">
            Take your time reading the instructions and studying the concept on the left pane.
          </p>
          <div className="border-t-4 border-dashed border-zinc-700 my-6" />
          <p className="font-game text-lg text-gray-400">
            Once you have fully understood the topic, click the button below to claim your XP and advance to the next step!
          </p>
        </div>

        <div className="font-game text-2xl text-green-400 flex items-center justify-center gap-2">
          <Image src="/star.png" alt="XP Star" width={30} height={30} />
          <span>Reward: +{courseExerciseData?.exercises[exerciseIndex]?.xp || 50} XP</span>
        </div>
      </div>

      <div className="w-full flex justify-end">
        <Button
          variant={isCompleted ? "pixelDisabled" : "pixel"}
          onClick={isCompleted ? undefined : onCompleteExercise}
          disabled={loading}
          className={`font-game text-2xl px-8 py-6 w-full sm:w-auto ${isCompleted ? "" : "bg-[#a3e534] text-black hover:bg-[#bbf255]"}`}
        >
          {isCompleted ? "Already Completed !" : loading ? "Completing..." : "Mark Lesson Completed"}
        </Button>
      </div>
    </div>
  );
}
