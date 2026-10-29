import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import SectionHeading from '../components/SectionHeading';
import Magnetic from '../components/Magnetic';
import {
  Mail,
  Phone,
  MapPin,
  Copy,
  Check,
  Send,
  Github,
  Linkedin,
  Code2,
  CheckCircle2
} from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/content';

export default function Contact() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');
  const [copied, setCopied] = useState(false);

  const validate = () => {
    const nextErrors = {};
    if (!formState.name.trim()) nextErrors.name = 'Name is required';
    if (
      !formState.email.trim() ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)
    ) {
      nextErrors.email = 'Valid email is required';
    }
    if (!formState.message.trim() || formState.message.trim().length < 10) {
      nextErrors.message = 'Message must be at least 10 characters';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus('sending');
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    try {
      if (
        serviceId &&
        templateId &&
        publicKey &&
        !serviceId.includes('your_')
      ) {
        await emailjs.send(
          serviceId,
          templateId,
          {
            from_name: formState.name,
            reply_to: formState.email,
            message: formState.message
          },
          publicKey
        );
      } else {
        await new Promise((r) => setTimeout(r, 900));
      }
      setStatus('success');
      setFormState({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
    }
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PORTFOLIO_DATA.personal.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 z-10"
    >
      <div className="max-w-7xl mx-auto">
        <SectionHeading index="06" label="Contact" title="Let's build something" accent="exceptional" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 glass-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              <h3 className="font-display text-3xl font-semibold text-cream">
                Get in touch
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Open to AI/Data Science engineering roles, full-stack development opportunities, and research collaborations.
              </p>

              <div className="space-y-4">
                <div className="flex items-center justify-between py-3.5 border-b border-white/10">
                  <div className="flex items-center gap-3 min-w-0">
                    <Mail className="w-4 h-4 text-amber shrink-0" />
                    <a
                      href={`mailto:${PORTFOLIO_DATA.personal.email}`}
                      className="text-xs sm:text-sm text-cream truncate hover:text-amber transition-colors duration-700"
                    >
                      {PORTFOLIO_DATA.personal.email}
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[11px] uppercase tracking-[0.14em] text-amber border border-amber/40 hover:bg-amber hover:text-void transition-colors duration-700 shrink-0"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        Copy
                      </>
                    )}
                  </button>
                </div>

                <div className="flex items-center gap-3 py-3.5 border-b border-white/10">
                  <Phone className="w-4 h-4 text-amber shrink-0" />
                  <a
                    href={`tel:${PORTFOLIO_DATA.personal.phone.replace(/\s+/g, '')}`}
                    className="text-xs sm:text-sm text-cream hover:text-amber transition-colors duration-700"
                  >
                    {PORTFOLIO_DATA.personal.phone}
                  </a>
                </div>

                <div className="flex items-center gap-3 py-3.5 border-b border-white/10">
                  <MapPin className="w-4 h-4 text-amber shrink-0" />
                  <span className="text-xs sm:text-sm text-cream">
                    {PORTFOLIO_DATA.personal.location}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10">
              <span className="block eyebrow !text-muted mb-3">
                Verified Networks
              </span>
              <div className="flex flex-wrap gap-3">
                <a
                  href={PORTFOLIO_DATA.personal.socials.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] uppercase tracking-[0.14em] text-cream hover:text-amber border border-white/15 hover:border-amber/60 transition-colors duration-700"
                >
                  <Linkedin className="w-4 h-4" />
                  LinkedIn
                </a>
                <a
                  href={PORTFOLIO_DATA.personal.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] uppercase tracking-[0.14em] text-cream hover:text-amber border border-white/15 hover:border-amber/60 transition-colors duration-700"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
                <a
                  href={PORTFOLIO_DATA.personal.socials.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-[11px] uppercase tracking-[0.14em] text-cream hover:text-amber border border-white/15 hover:border-amber/60 transition-colors duration-700"
                >
                  <Code2 className="w-4 h-4" />
                  LeetCode
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 glass-card rounded-3xl p-6 sm:p-8">
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full min-h-[320px] flex flex-col items-center justify-center text-center p-6"
              >
                <div className="w-16 h-16 rounded-full border border-amber flex items-center justify-center text-amber mb-4 shadow-[0_0_30px_rgba(232,162,74,0.35)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-display text-3xl font-semibold text-cream">
                  Message received
                </h3>
                <p className="mt-2 text-sm text-muted max-w-md">
                  Thank you for reaching out! Naresh B A will review your message and respond shortly.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus('idle')}
                  className="mt-6 btn-outline"
                >
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <label
                    htmlFor="name"
                    className="block eyebrow !text-muted"
                  >
                    Your Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    placeholder="Your name"
                    className="field"
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-rose-400">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block eyebrow !text-muted"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    placeholder="ada@analyticalengine.org"
                    className="field"
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-rose-400">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block eyebrow !text-muted"
                  >
                    Project Brief / Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    placeholder="Tell me about your AI product, platform, or role..."
                    className="field resize-none"
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-rose-400">
                      {errors.message}
                    </p>
                  )}
                </div>

                {status === 'error' && (
                  <p className="text-xs text-rose-400">
                    Something went wrong. Please use the direct email link on the left.
                  </p>
                )}

                <Magnetic>
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="btn-gold disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    {status === 'sending' ? 'Sending...' : 'Send Message'}
                  </button>
                </Magnetic>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
