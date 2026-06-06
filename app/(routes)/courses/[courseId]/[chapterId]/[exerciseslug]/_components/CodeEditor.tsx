import {
    SandpackProvider,
    SandpackLayout,
    SandpackCodeEditor,
    SandpackPreview,
    useSandpack,
} from "@codesandbox/sandpack-react";
import React from 'react'
import SplitterLayout from "react-splitter-layout";
import 'react-splitter-layout/lib/index.css';
import { CourseExercise } from "../page";
import { Button } from "@/components/ui/button";
import { nightOwl } from "@codesandbox/sandpack-themes";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
type Props = {
    courseExerciseData: CourseExercise | undefined,
    loading: boolean,
    nextExerciseRoute: string | undefined
}


const CodeEditorChildren = ({ onCompleteExercise, IsCompleted }: any) => {

    const { sandpack } = useSandpack();

    return (
        <div className="font-game absolute bottom-40 flex gap-5 right-5">
            <Button variant={'pixel'} size={'lg'}
                className="text-xl"

                onClick={() => sandpack.runSandpack()}>Run Code</Button>
            <Button variant={'pixel'}
                className="bg-[#a3e534] text-xl" size={'lg'}
                onClick={() => onCompleteExercise()}
                disabled={IsCompleted}
            >
                {IsCompleted ? 'Already Completed !' : 'Mark Completed !'} </Button>
        </div>
    )
}

function CodeEditor({ courseExerciseData, loading, nextExerciseRoute }: Props) {

    const { exerciseslug } = useParams();
    const exerciseIndex = courseExerciseData?.exercises?.findIndex(item => item.slug == exerciseslug);//0,1,
    const router = useRouter();
    const IsCompleted = courseExerciseData?.completedExercise?.find(item => item?.exerciseId == Number(exerciseIndex) + 1);
    console.log(IsCompleted);
    const onCompleteExercise = async () => {

        if (exerciseIndex == undefined) {
            return;
        }
        console.log("ourseExerciseData?.exercises[exerciseIndex].xp", courseExerciseData?.exercises[exerciseIndex].xp)
        const result = await axios.post('/api/exercise/complete', {
            courseId: courseExerciseData?.courseId,
            chapterId: courseExerciseData?.chapterId,
            exerciseId: exerciseIndex + 1,
            xpEarned: courseExerciseData?.exercises[exerciseIndex].xp
        })

        console.log(result);
        toast.success('Exercise Completed!')
        router.push(nextExerciseRoute ?? '#')

    }

    return (
        <div className="h-full">
            <SandpackProvider
                //@ts-ignore
                template={courseExerciseData?.editorType ?? 'react'}
                theme={nightOwl}
                style={{
                    height: '100vh'
                }}
                files={courseExerciseData?.exerciseData?.exercisesContent?.starterCode}
                options={{
                    autorun: false,
                    autoReload: false
                }}
            >
                <SandpackLayout style={{
                    height: '100%'
                }}>
                    <SplitterLayout
                        percentage
                        primaryMinSize={30}
                        secondaryMinSize={30}
                        secondaryInitialSize={50}
                    >
                        <div className="relative h-full">
                            <SandpackCodeEditor
                                showTabs
                                style={{
                                    height: '100%'
                                }} />
                            <CodeEditorChildren
                                onCompleteExercise={onCompleteExercise}
                                IsCompleted={IsCompleted} />
                        </div>

                        <SandpackPreview
                            showNavigator
                            showOpenInCodeSandbox={false}
                            showOpenNewtab
                            style={{
                                height: '100%'
                            }} />
                    </SplitterLayout>
                </SandpackLayout>
            </SandpackProvider>


        </div>
    )
}

export default CodeEditor