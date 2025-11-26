export const bgColors = [
  "bg-blue-700",
  "bg-red-700",
  "bg-pink-700",
  "bg-yellow-700",
  "bg-green-700",
  "bg-purple-700",
] as const;

export const borderColors = [
  "border-blue-700",
  "border-red-700",
  "border-pink-700",
  "border-yellow-700",
  "border-green-700",
  "border-purple-700",
] as const;

export type BgColor = (typeof bgColors)[number];
export type BorderColor = (typeof borderColors)[number];
