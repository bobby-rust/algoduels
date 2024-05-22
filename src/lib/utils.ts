import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))  
}  

export function capitalize(str: string): string {
    const result = str.charAt(0).toUpperCase() + str.slice(1);
    return result;
}    

export function toTitleCase(str: string): string {
    const articles = new Set(["a", "an", "the"]);    
	const conjunctions = new Set([
        "and",
        "but",
        "or",
        "nor",
        "for",
        "so",
        "yet",
    ]);    
    const prepositions = new Set([
        "as",
        "at",
        "by",
        "in",
        "of",
        "off",
        "on",
        "out",
        "to",
        "up",
        "with",
    ]);    

    const newArr = str.split(" ").map((word: string, index: number) => {
        return (
            index == 0 || 
            !articles.has(word) &&
            !conjunctions.has(word) &&
            !prepositions.has(word)
        ) ? capitalize(word) : word    
        
    })    
    return newArr.join(" ") 
}        


