import { db } from "@/config/db";
import { CourseChaptersTable } from "@/config/schema";
import { NextRequest, NextResponse } from "next/server";

const DATA = [
    {
        "id": 1,
        "name": "Introduction to Python",
        "desc": "Understand what Python is, why it's popular, and how it is used in real-world applications.",
        "exercises": [
            { "name": "Python Explorer", "slug": "python-explorer", "xp": 20, "difficulty": "easy" },
            { "name": "Why Python?", "slug": "why-python", "xp": 20, "difficulty": "easy" },
            { "name": "Hello Python!", "slug": "hello-python", "xp": 25, "difficulty": "easy" },
            { "name": "Run Your First Script", "slug": "run-your-first-script", "xp": 30, "difficulty": "easy" }
        ]
    },
    {
        "id": 2,
        "name": "Variables & Data Types",
        "desc": "Learn how to store information using variables and understand Python's basic data types.",
        "exercises": [
            { "name": "Variable Hero", "slug": "variable-hero", "xp": 30, "difficulty": "easy" },
            { "name": "Type Identifier", "slug": "type-identifier", "xp": 25, "difficulty": "easy" },
            { "name": "String Magic", "slug": "string-magic", "xp": 25, "difficulty": "easy" },
            { "name": "Numbers Playground", "slug": "numbers-playground", "xp": 30, "difficulty": "easy" }
        ]
    },
    {
        "id": 3,
        "name": "Operators & Expressions",
        "desc": "Perform calculations and logical operations using Python operators.",
        "exercises": [
            { "name": "Math Hero", "slug": "math-hero", "xp": 30, "difficulty": "easy" },
            { "name": "Comparison Duel", "slug": "comparison-duel", "xp": 25, "difficulty": "easy" },
            { "name": "Logical Gates Quest", "slug": "logical-gates-quest", "xp": 30, "difficulty": "easy" },
            { "name": "Expression Puzzle", "slug": "expression-puzzle", "xp": 30, "difficulty": "easy" }
        ]
    },
    {
        "id": 4,
        "name": "Control Flow",
        "desc": "Learn how to make decisions in your code using if, else, and loops.",
        "exercises": [
            { "name": "If-Else Warrior", "slug": "if-else-warrior", "xp": 30, "difficulty": "easy" },
            { "name": "Loop Runner", "slug": "loop-runner", "xp": 35, "difficulty": "medium" },
            { "name": "Range Master", "slug": "range-master", "xp": 25, "difficulty": "easy" },
            { "name": "Nested Logic Arena", "slug": "nested-logic-arena", "xp": 40, "difficulty": "medium" }
        ]
    },
    {
        "id": 5,
        "name": "Functions",
        "desc": "Break your program into reusable blocks using Python functions.",
        "exercises": [
            { "name": "Function Builder", "slug": "function-builder", "xp": 30, "difficulty": "easy" },
            { "name": "Arguments Arena", "slug": "arguments-arena", "xp": 35, "difficulty": "medium" },
            { "name": "Return Value Hero", "slug": "return-value-hero", "xp": 30, "difficulty": "easy" },
            { "name": "Function Mini-Project", "slug": "function-mini-project", "xp": 40, "difficulty": "medium" }
        ]
    },
    {
        "id": 6,
        "name": "Lists, Tuples & Dictionaries",
        "desc": "Work with Python's most important data structures to store and organize data.",
        "exercises": [
            { "name": "List Builder", "slug": "list-builder", "xp": 30, "difficulty": "easy" },
            { "name": "Tuple Explorer", "slug": "tuple-explorer", "xp": 25, "difficulty": "easy" },
            { "name": "Dictionary Keeper", "slug": "dictionary-keeper", "xp": 35, "difficulty": "medium" },
            { "name": "Data Structure Challenge", "slug": "data-structure-challenge", "xp": 40, "difficulty": "medium" }
        ]
    },
    {
        "id": 7,
        "name": "Loops, Modules & File Handling",
        "desc": "Learn advanced loops, import modules, and read/write files in Python.",
        "exercises": [
            { "name": "Loop Mastery", "slug": "loop-mastery", "xp": 35, "difficulty": "medium" },
            { "name": "Module Explorer", "slug": "module-explorer", "xp": 30, "difficulty": "easy" },
            { "name": "File Reader Quest", "slug": "file-reader-quest", "xp": 40, "difficulty": "medium" },
            { "name": "Text Writer Challenge", "slug": "text-writer-challenge", "xp": 45, "difficulty": "medium" }
        ]
    }
]


export async function GET(req: NextRequest) {

    DATA.forEach(async (item) => {
        await db.insert(CourseChaptersTable).values({
            courseId: 4, //Change Course ID depends on course info,
            desc: item?.desc,
            exercises: item.exercises,
            name: item?.name,
            chapterId: item?.id
        })
    })

    return NextResponse.json('Success')

}