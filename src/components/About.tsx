"use client";

import { motion } from "framer-motion";

const WHAT_I_DO = [
  {
    title: "Artificial Intelligence & Machine Learning",
    description: "Developing intelligent applications using Machine Learning, Deep Learning, Computer Vision, NLP, and modern AI frameworks.",
    icon: (
      <svg className="w-8 h-8 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.467 5.99 5.99 0 0 0-1.925 3.546 5.974 5.974 0 0 1-2.133-1A3.75 3.75 0 0 0 12 18Z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 1 1 7.072 0l-.548.547A3.374 3.374 0 0 0 14 18.469V19a2 2 0 1 1-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    color: "from-blue-500/10 to-indigo-500/10 hover:border-blue-500/30",
  },
  {
    title: "Full Stack Development",
    description: "Building responsive, scalable, and user-centric web applications using React, Node.js, Express.js, and MongoDB.",
    icon: (
      <svg className="w-8 h-8 text-purple-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
      </svg>
    ),
    color: "from-purple-500/10 to-pink-500/10 hover:border-purple-500/30",
  },
  {
    title: "Linux & DevOps",
    description: "Working with Linux environments, Bash scripting, Docker containers, deployment workflows, and server administration.",
    icon: (
      <svg className="w-8 h-8 text-green-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653Z" />
      </svg>
    ),
    color: "from-green-500/10 to-emerald-500/10 hover:border-green-500/30",
  },
  {
    title: "Data Engineering & Analytics",
    description: "Exploring data processing, analytics, Hadoop ecosystems, Hive, and visualization techniques to uncover meaningful insights.",
    icon: (
      <svg className="w-8 h-8 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
    color: "from-orange-500/10 to-yellow-500/10 hover:border-orange-500/30",
  },
];

export default function About() {
  return (
    <section className="relative z-20 bg-[#0a0a0a] py-32 px-4 md:px-12 overflow-hidden" id="about">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[10%] w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24">
          {/* About Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col justify-center"
          >
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
              About <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">Me</span>
            </h2>
            <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
              <p>
                I'm an Artificial Intelligence and Data Science student at Nandha Engineering College with a passion for building intelligent software solutions and scalable web applications.
              </p>
              <p>
                My journey began with programming and gradually evolved into exploring Machine Learning, Full Stack Development, Linux systems, and cloud technologies. I enjoy solving complex problems, designing efficient systems, and creating applications that deliver real value.
              </p>
              <p>
                With hands-on experience in Python, Java, React, Node.js, MongoDB, Linux environments, and AI frameworks, I continuously work on projects that combine innovation with practical impact.
              </p>
              <p className="text-white font-medium border-l-2 border-blue-500 pl-4 italic">
                "I believe technology becomes meaningful when it solves real-world challenges, and that philosophy drives every project I build."
              </p>
            </div>
          </motion.div>

          {/* Portrait Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 flex items-center justify-center"
          >
            <div className="relative w-full max-w-sm aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 shadow-2xl group hover:border-blue-500/30 transition-all duration-500">
              {/* Soft behind-image glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-3xl blur-md opacity-20 group-hover:opacity-45 transition-opacity duration-500" />
              
              <img
                src="/profile.jpg"
                alt="Naresh B A"
                className="relative w-full h-full object-cover rounded-3xl group-hover:scale-105 transition-transform duration-700"
              />
              {/* Ambient Dark Bottom Tint */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </div>
          </motion.div>
        </div>

        {/* What I Do Section */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold text-white mb-12 text-center tracking-tight"
          >
            What I <span className="text-blue-400">Do</span>
          </motion.h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {WHAT_I_DO.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className={`p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm bg-linear-to-br ${item.color} transition-all duration-300 flex gap-6`}
              >
                <div className="shrink-0 p-3 rounded-2xl bg-black/40 border border-white/5 h-fit">
                  {item.icon}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-white mb-3">{item.title}</h4>
                  <p className="text-gray-400 leading-relaxed text-sm md:text-base">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
