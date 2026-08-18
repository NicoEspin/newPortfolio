import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAdjacentProject, getProject, projects } from "@/lib/projects";
import { getServerMessages } from "@/lib/i18n-server";
import ProjectDetail from "@/components/sections/ProjectDetail";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata(
  props: PageProps<"/work/[slug]">
): Promise<Metadata> {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) return {};
  const { messages } = await getServerMessages();
  const solution = (messages.projects as Record<string, { solution: string }>)[slug]?.solution;
  return {
    title: `${project.name} — NE.`,
    description: solution,
  };
}

export default async function ProjectPage(props: PageProps<"/work/[slug]">) {
  const { slug } = await props.params;
  const project = getProject(slug);
  if (!project) notFound();

  const next = getAdjacentProject(slug);

  return <ProjectDetail project={project} next={next} />;
}
