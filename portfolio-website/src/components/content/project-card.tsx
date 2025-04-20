import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { type Project } from "contentlayer/generated";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex flex-col overflow-hidden">
      <Link href={project.url} className="relative aspect-video overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
        />
      </Link>
      <CardHeader className="flex flex-col space-y-1.5 p-4">
        <div className="space-y-1">
          <h3 className="font-bold hover:text-primary">
            <Link href={project.url}>{project.title}</Link>
          </h3>
          <p className="text-sm text-muted-foreground">
            {formatDate(project.date)}
          </p>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-4 pt-0">
        <p className="text-muted-foreground">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4">
        <div className="flex w-full gap-2">
          <Button variant="default" asChild className="w-full">
            <Link href={project.url}>View Details</Link>
          </Button>
          <div className="flex gap-2">
            {project.github && (
              <Button size="icon" variant="outline" asChild>
                <Link href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>
            )}
            {project.demo && (
              <Button size="icon" variant="outline" asChild>
                <Link href={project.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                  <span className="sr-only">Live Demo</span>
                </Link>
              </Button>
            )}
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}