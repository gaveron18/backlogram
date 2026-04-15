import React from 'react'
import { motion } from 'framer-motion'

const CLIENTS = [
  { name: 'БМТ', logo: '/logos/bmt.png' },
  { name: "Domino's", logo: '/logos/dominos.svg' },
  { name: 'Audi', logo: '/logos/audi.svg' },
  { name: 'HRlink', logo: '/logos/hrlink.png' },
  { name: 'UpSound', logo: '/logos/upsound.png' },
  { name: 'ПраВь МСК', logo: '/logos/pravmsk.png' },
  { name: 'Долина Овощей', logo: '/logos/dolina-ovoshchey.png' },
  { name: 'Тянь', logo: '/logos/tyan.png' },
  { name: 'BAIR', logo: '/logos/bair.svg' },
  { name: 'Milka', logo: '/logos/milka.svg' },
  { name: 'Фонд', logo: '/logos/fyond.png' },
  { name: 'ПМК-178 Бетон', logo: '/logos/pmk178.png' },
  { name: 'Торион', logo: '/logos/torion.png' },
  { name: 'ГидроБот', logo: '/logos/gidrobot.png' },
]

export default function ClientLogos() {
  return (
    <section className="py-16 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-10">
          Воспользовались опытом команды и нашими решениями
        </p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {CLIENTS.map((client) => (
            <div
              key={client.name}
              title={client.name}
              className="w-28 h-16 flex items-center justify-center rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 p-3 hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-sm transition-all"
            >
              <img
                src={client.logo}
                alt={client.name}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
