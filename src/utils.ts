import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * This function is a wrapper around clsx that merges the classes
 * with the tailwind classes.
 *
 * Example:
 *
 * ```tsx
 * const MyComponent = ({ className }) => (
 *  <div className={cn("text-red-500", className)}>Hello World</div>
 * );
 * ```
 * @param inputs The classes to merge
 * @returns The merged classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
