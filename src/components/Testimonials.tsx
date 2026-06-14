"use client";

import { motion } from "framer-motion";

const ACHIEVEMENTS = [
  {
    title: "Innovation Day 2025",
    subtitle: "🥉 3rd Place Winner",
    description: "Awarded for developing an AI-powered Speech-to-Text Web Application demonstrating practical AI implementation, coding quality, and technical innovation.",
    category: "Award",
    image: "/gallery/awards_innovation.png",
  },
  {
    title: "Google AI Prompt Engineering Essentials",
    subtitle: "Google Professional Credential",
    description: "Earned professional credential covering prompt optimization, LLM structuring, and prompt engineering strategies directly from Google.",
    category: "Certification",
    image: "/gallery/cert_google_ai.png",
  },
  {
    title: "Python for Machine Learning",
    subtitle: "Coursera Certification",
    description: "Certification demonstrating proficiency in Python programming for building, testing, and optimizing Machine Learning pipelines.",
    category: "Certification",
    image: "/gallery/cert_python_ml.png",
  },
  {
    title: "Data Analysis with Power BI",
    subtitle: "Power BI Analytics Credential",
    description: "Certification covering data ingestion, modeling, dashboard creation, and analytics visualization with Power BI.",
    category: "Certification",
    image: "/gallery/cert_power_bi.png",
  },
  {
    title: "Academic Excellence Certifications",
    subtitle: "Nandha Engineering College",
    description: "Academic credentials and coursework highlighting active pursuit of excellence in Nandha Engineering College B.Tech syllabus.",
    category: "Academic",
    image: "/gallery/cert_academic.png",
  },
];

export default function Testimonials() {
  return (
    <section className="relative z-20 bg-[#0a0a0a] py-32 overflow-hidden" id="testimonials">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
         <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
         <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
      </div>

       <div className="container mx-auto px-6 mb-16 text-center relative z-10">
            <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
            >
                Awards & <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">Credentials</span>
            </motion.h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                Key milestones, professional certifications, and awards earned in Artificial Intelligence, machine learning, and data analytics.
            </p>
       </div>

      <div className="relative w-full overflow-hidden mask-linear-fade">
         {/* Mask gradient for fade effect on edges */}
         <div className="absolute top-0 left-0 w-32 h-full z-20 bg-linear-to-r from-[#121212] to-transparent" />
         <div className="absolute top-0 right-0 w-32 h-full z-20 bg-linear-to-l from-[#121212] to-transparent" />

        <div className="flex w-max">
          <motion.div
            className="flex gap-8 px-4"
            animate={{ x: "-50%" }}
            transition={{
              duration: 35,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {[...ACHIEVEMENTS, ...ACHIEVEMENTS].map((item, index) => (
              <div
                key={index}
                className="w-[350px] md:w-[450px] rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm shrink-0 flex flex-col justify-between overflow-hidden shadow-2xl"
              >
                 {item.image && (
                   <div className="w-full h-44 overflow-hidden relative">
                     <img
                       src={item.image}
                       alt={item.title}
                       className="w-full h-full object-cover opacity-60 hover:opacity-80 transition-opacity duration-500"
                     />
                     <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/80 to-transparent" />
                   </div>
                 )}
                 <div className="p-8 flex-1 flex flex-col justify-between">
                   <div className="flex items-start gap-4 mb-6">
                      <div>
                          <span className="text-[10px] uppercase font-mono tracking-widest text-blue-400 border border-blue-400/30 px-2 py-0.5 rounded-full bg-blue-500/5 mb-1.5 inline-block">
                            {item.category}
                          </span>
                          <h4 className="text-white font-bold text-lg leading-tight">{item.title}</h4>
                          <p className="text-sm text-purple-300 font-medium mt-1">{item.subtitle}</p>
                      </div>
                   </div>
                   <p className="text-gray-300 leading-relaxed text-sm">
                      {item.description}
                   </p>
                 </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
