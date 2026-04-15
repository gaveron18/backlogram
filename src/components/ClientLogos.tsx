import React from 'react'
import { motion } from 'framer-motion'

const CLIENTS = [
  { name: 'БМТ' },
  { name: 'Neoflex' },
  { name: "Domino's" },
  { name: 'Audi' },
  { name: 'Rlink' },
  { name: 'UpSound' },
  { name: 'ПроВе' },
  { name: 'BAIR' },
  { name: 'Milka' },
  { name: 'ПМК-178 Бетон' },
  { name: 'Торнон' },
  { name: 'ГидроБот' },
]

export default function ClientLogos() {
  return (
    <section className="py-16 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-10">
          Используют нашу платформу
        </p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3 sm:gap-4"
        >
          {CLIENTS.map((client) => (
            <div
              key={client.name}
              className="px-5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-500 dark:text-slate-400 text-sm font-semibold tracking-wide hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-700 dark:hover:text-slate-300 transition-all"
            >
              {client.name}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
