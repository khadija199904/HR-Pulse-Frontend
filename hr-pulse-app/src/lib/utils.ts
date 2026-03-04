import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}
export function cleanJobTitle(title: string) {
    if (!title) return "";
    return title
        .replace(/post ouvert/gi, '')
        .replace(/full remote/gi, '')
        .replace(/remote/gi, '')
        .replace(/offre/gi, '')
        .replace(/[-\s|]+$/g, '') // Remove trailing dashes, pipes or spaces
        .trim();
}
