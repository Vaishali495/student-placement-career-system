/**
 * Extracts up to 2 uppercase initials from a full name (e.g., "Arjun Sharma" -> "AS")
 */
export const getInitials = (name?: string): string => {
  if (!name?.trim()) return "U";
  return name
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};