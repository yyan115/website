import { allProjects } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import { ProjectCard } from "@/components/content/project-card";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Browse my portfolio of projects",
};

export default function ProjectsPage() {
  const projects = allProjects.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <div className="container py-12">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block font-heading text-4xl font-bold tracking-tight lg:text-5xl">
            Projects
          </h1>
          <p className="text-xl text-muted-foreground">
            A collection of my latest work and ongoing projects.
          </p>
        </div>
      </div>
      <hr className="my-8" />
      {projects?.length ? (
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      ) : (
        <p>No projects published yet. Check back soon!</p>
      )}
    </div>
  );
}