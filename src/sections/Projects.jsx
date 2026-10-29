import React, { useState } from 'react';
import { ExternalLink, Github, Maximize2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/content';
import ProjectModal from '../components/ProjectModal';
import Tilt from '../components/Tilt';
import SectionHeading from '../components/SectionHeading';

function ProjectCard({ project, index, onSelect }) {
  return (
    <Tilt max={6} className="rounded-3xl">
      <article className="glass-card rounded-3xl p-7 sm:p-9 h-full flex flex-col justify-between overflow-hidden group">
        <div>
          <div className="flex items-start justify-between gap-2 mb-6">
            <span className="font-display text-7xl font-medium leading-none text-gold">
              {String(index + 1).padStart(2, '0')}
            </span>
            <button
              type="button"
              onClick={() => onSelect(project)}
              aria-label={`Inspect ${project.title}`}
              className="p-2.5 rounded-full border border-white/15 text-muted hover:text-amber hover:border-amber/60 transition-colors duration-700"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>

          <p className="eyebrow mb-3">{project.badge}</p>
          <h3 className="font-display text-2xl sm:text-3xl font-semibold text-cream leading-tight">
            {project.title}
          </h3>
          <p className="mt-4 text-sm text-muted leading-relaxed">{project.shortDesc}</p>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-full text-[11px] text-cream/70 border border-white/10"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-5 border-t border-white/10 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => onSelect(project)}
            className="text-[11px] uppercase tracking-[0.22em] text-amber hover:text-amber-light transition-colors duration-700"
          >
            View Architecture &rarr;
          </button>
          <div className="flex items-center gap-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} GitHub repository`}
              className="p-2 rounded-full text-muted hover:text-amber transition-colors duration-700"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${project.title} Live Demo`}
              className="p-2 rounded-full text-muted hover:text-amber transition-colors duration-700"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </article>
    </Tilt>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <section
      id="projects"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 z-10"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading index="04" label="Projects" title="Selected" accent="work" />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {PORTFOLIO_DATA.projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              onSelect={setSelectedProject}
            />
          ))}
        </div>
      </div>

      <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  );
}
