import type { Metadata } from "next";
import Contact from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Start a project, collaborate, or just say hello.",
};

export default function ContactPage() {
  return <Contact />;
}
