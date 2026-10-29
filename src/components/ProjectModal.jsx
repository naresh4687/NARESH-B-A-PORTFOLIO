import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, Cpu, Layers } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-2xl glass-card rounded-3xl p-7 sm:p-10 border-amber/30 shadow-[0_0_60px_-10px_rgba(232,162,74,0.25)] overflow-hidden"
          >
            <div className="light-strip absolute inset-x-6 top-0" aria-hidden="true" />
            <div className="absolute -top-24 -right-24 w-56 h-56 rounded-full bg-amber/15 blur-3xl pointer-events-none" />

            <div className="flex items-start justify-between gap-4">
              <span className="inline-flex items-center gap-1.5 eyebrow">
                <Cpu className="w-3.5 h-3.5" />
                {project.badge}
              </span>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="p-2 rounded-full border border-white/15 text-muted hover:text-amber hover:border-amber/60 transition-colors duration-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3
              id="modal-project-title"
              className="mt-4 font-display text-3xl sm:text-4xl font-semibold text-cream leading-tight"
            >
              {project.title}
            </h3>

            <p className="mt-4 text-sm sm:text-base text-muted leading-relaxed">
              {project.details}
            </p>

            <div className="mt-6">
              <div className="flex items-center gap-2 eyebrow !text-muted mb-3">
                <Layers className="w-3.5 h-3.5 text-amber" />
                Architecture & Tech Stack
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 rounded-full text-xs text-cream/80 border border-white/10"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-5 border-t border-white/10 flex flex-wrap items-center gap-4">
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline"
              >
                <Github className="w-4 h-4" />
                Source Repository
              </a>
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
              >
                <ExternalLink className="w-4 h-4" />
                Live Deployment
              </a>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
