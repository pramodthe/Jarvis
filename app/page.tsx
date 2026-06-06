"use client";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Image from "next/image";
import Hero from "./_components/Hero";
import Header from "./_components/Header";
import CourseList from "./(routes)/courses/_components/CourseList";
import Link from "next/link";

/**
 * Default page of the application.
 * @returns 
 */

export default function Home() {

  return (
    <div className="flex flex-col items-center ">


      {/* Hero section  */}
      <Hero />

      <div className="p-10 md:px-24 lg:px-36 xl:px-48 flex flex-col items-center">
        <h2 className="font-game text-6xl text-center">Popular Course to Explore</h2>
        <p className="text-2xl font-game text-center mt-3">Learn Coding with interactive courses, Practical handson with real life example!</p>
        <CourseList maxLimit={6} />

        <Link href={'/courses'}>
          <Button className="mt-5 font-game text-2xl" variant={'pixel'}>Explore More Courses</Button>
        </Link>
      </div>
    </div>
  );
}
