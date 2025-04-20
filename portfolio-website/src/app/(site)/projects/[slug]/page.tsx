import { allProjects } from "contentlayer/generated";
import { notFound } from "next/navigation";
import { Mdx } from "@/components/content/mdx-components";
import Image from "next/image";
import { formatDate } from "@/lib/utils";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

async function getProjectFromParams(params: ProjectPageProps["params"]) {
  const slug = params?.slug;
  const project = allProjects.find((p) => p.slug === slug);

  if (!project) {
    null;
  }

  return project;
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const project = await getProjectFromParams(params);

  if (!project) {
    return {
      title: "Project Not Found",
      description: "The project you're looking for doesn't exist.",
    };
  }

  return {
    title: project.title,
    description: project.description,
  };
}

export async function generateStaticParams(): Promise<
  ProjectPageProps["params"][]
> {
  return allProjects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = await getProjectFromParams(params);

  if (!project) {
    notFound();
  }

  return (
    <div className="container max-w-3xl py-10">
      <Button variant="ghost" asChild className="mb-8 flex h-9 items-center rounded-md px-4">
        <Link href="/projects">
          <ArrowLeft className="mr-2 h-4 w-4" />
          See all projects
        </Link>
      </Button>
      <article>
        <div className="space-y-4">
          <h1 className="inline-block font-heading text-4xl font-bold lg:text-5xl">
            {project.title}
          </h1>
          <div className="flex items-center gap-4">
            <time dateTime={project.date} className="text-muted-foreground">
              {formatDate(project.date)}
            </time>
            <div className="flex gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            {project.github && (
              <Button variant="outline" size="sm" asChild>
                <Link href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  GitHub
                </Link>
              </Button>
            )}
            {project.demo && (
              <Button size="sm" asChild>
                <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </Link>
              </Button>
            )}
          </div>
          <div className="relative aspect-video overflow-hidden rounded-lg border bg-muted">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
        <div className="mt-8">
          <Mdx code={project.body.code} />
        </div>
      </article>
    </div>
  );
}