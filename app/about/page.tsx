import type { Metadata } from "next";
import About from "@/components/About";

export const metadata: Metadata = {
  title: "About Me",
  description:
    "UX and visual designer, design engineer. Experience, awards, certifications, and education.",
};

export default function AboutPage() {
  return <About />;
}
