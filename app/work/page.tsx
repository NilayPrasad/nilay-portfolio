import type { Metadata } from "next";
import WorkIndex from "@/components/WorkIndex";

export const metadata: Metadata = {
  title: "Works",
  description: "Selected projects: interfaces, identities, and systems.",
};

export default function WorkPage() {
  return <WorkIndex />;
}
