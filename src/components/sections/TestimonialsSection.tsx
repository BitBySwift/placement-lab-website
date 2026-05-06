'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { TESTIMONIALS } from '@/utils/constants';
import { FaStar } from 'react-icons/fa';

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Success <span className="gradient-text">Stories</span>
          </h2>
          <p className="text-slate-400 text-lg">Hear from our students who transformed their careers</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card-base flex flex-col"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                  <Image src={t.image} alt={t.name} fill className="object-cover" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{t.name}</p>
                  <p className="text-slate-400 text-xs">{t.role} at {t.company}</p>
                </div>
              </div>
              <div className="flex mb-3">
                {[...Array(t.rating)].map((_, j) => (
                  <FaStar key={j} className="text-yellow-400 text-sm" />
                ))}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed flex-1">&quot;{t.message}&quot;</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
