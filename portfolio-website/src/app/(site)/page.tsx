import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { allProjects } from "contentlayer/generated";
import { compareDesc } from "date-fns";
import { ArrowRight, Github, Download, Mail } from "lucide-react";
import { ProjectCard } from "@/components/content/project-card";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const featuredProjects = allProjects
    .filter((project) => project.featured)
    .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
    .slice(0, 3);

  return (
    <>
      {/* Hero Section */}
      <section className="container space-y-6 py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h1 className="font-heading text-3xl font-bold leading-[1.1] sm:text-5xl md:text-6xl">
            Hi, I&apos;m <span className="text-primary">Your Name</span>
          </h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            A computer science student passionate about web development, machine learning, and building impactful applications
          </p>
          <div className="flex gap-4">
            <Button size="lg" asChild>
              <Link href="#projects">View Projects</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="container space-y-6 bg-accent py-8 dark:bg-muted/50 md:py-12 lg:py-16">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl">
            About Me
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            I&apos;m a Computer Science student with a passion for building modern web applications and exploring new technologies. I love solving complex problems through clean, efficient code and creating intuitive user experiences.
          </p>
        </div>
      </section>

      {/* Skills Section */}
      <section className="container py-8 md:py-12 lg:py-24">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4">
          <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl">
            Technical Skills
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {[
              { name: "React", level: 90 },
              { name: "TypeScript", level: 85 },
              { name: "Node.js", level: 80 },
              { name: "Next.js", level: 75 },
              { name: "Tailwind CSS", level: 95 },
              { name: "Python", level: 70 },
              { name: "SQL", level: 65 },
              { name: "Git", level: 85 },
            ].map((skill) => (
              <div
                key={skill.name}
                className="flex flex-col gap-2 rounded-lg border bg-card p-4 text-card-foreground shadow-sm"
              >
                <h3 className="font-semibold">{skill.name}</h3>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-primary"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="container space-y-6 py-8 md:py-12 lg:py-24" id="projects">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl">
            Featured Projects
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Check out some of my recent work
          </p>
        </div>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
        <div className="flex justify-center">
          <Button asChild>
            <Link href="/projects">
              All Projects <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Resume Section */}
      <section className="container space-y-6 bg-accent py-8 dark:bg-muted/50 md:py-12 lg:py-16">
        <div className="mx-auto flex max-w-[58rem] flex-col items-center gap-4 text-center">
          <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl">
            Resume
          </h2>
          <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Want to know more about my experience and education?
          </p>
          <Button asChild>
            <Link href="/resume.pdf" target="_blank">
              <Download className="mr-2 h-4 w-4" /> Download Resume
            </Link>
          </Button>
        </div>
      </section>

      {/* Contact Section */}
      <section className="container py-8 md:py-12 lg:py-24" id="contact">
        <div className="mx-auto grid max-w-[58rem] gap-6 lg:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <h2 className="font-heading text-3xl font-bold leading-[1.1] sm:text-3xl">
              Get in Touch
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Have a question or want to work together? Feel free to reach out!
            </p>
            <div className="flex flex-col gap-2 text-muted-foreground">
              <Link
                href="mailto:your-email@example.com"
                className="flex items-center gap-2 font-medium hover:text-foreground"
              >
                <Mail className="h-5 w-5" /> your-email@example.com
              </Link>
              <Link
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-medium hover:text-foreground"
              >
                <Github className="h-5 w-5" /> GitHub
              </Link>
            </div>
          </div>
          <div className="rounded-lg border bg-card p-8">
            <form className="flex flex-col gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    name="name"
                    className="rounded-md border bg-background px-4 py-2"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    className="rounded-md border bg-background px-4 py-2"
                    placeholder="you@example.com"
                    required
                    type="email"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="subject">Subject</label>
                <input
                  id="subject"
                  name="subject"
                  className="rounded-md border bg-background px-4 py-2"
                  placeholder="How can I help you?"
                  required
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  className="min-h-[120px] rounded-md border bg-background px-4 py-2"
                  placeholder="Your message here..."
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}