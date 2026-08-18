import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import { getServerMessages } from "@/lib/i18n-server";
import WorkIndexPage from "@/components/sections/WorkIndexPage";

export async function generateMetadata(): Promise<Metadata> {
  const { messages } = await getServerMessages();
  return {
    title: messages.workIndex.metaTitle,
    description: messages.workIndex.metaDescription,
  };
}

export default function WorkPage() {
  return <WorkIndexPage projects={projects} />;
}
