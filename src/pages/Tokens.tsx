import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Zap, ArrowRight, CheckCircle2, BarChart3, Users, Clock, Info } from 'lucide-react'

export default function Tokens() {
  const plans = [
    {
      name: 'Знакомство',
      price: '0',
      currency: '₽',
      tokens: '3 000',
      tokensRaw: 3000,
      highlight: false,
      description: 'Для знакомства с платформой',
      perDay: '~136',
      users: '1 сотрудник ПЭО на месяц',
    },
    {
      name: 'Стартап',
      price: '1 950',
      currency: '₽',
      tokens: '5 000',
      tokensRaw: 5000,
      highlight: true,
      description: 'Для небольшой команды',
      perDay: '~227',
      users: '2 сотрудника ПЭО на месяц',
    },
    {
      name: 'Масштабируемый',
      price: '4 900',
      currency: '₽',
      tokens: '10 000',
      tokensRaw: 10000,
      highlight: false,
      description: 'Для активной команды',
      perDay: '~455',
      users: '4–5 сотрудников ПЭО на месяц',
    },
  ]

  const actionCosts = [
    { action: 'Открыть таблицу', cost: '1', heavy: false },
    { action: 'Создать запись', cost: '1', heavy: false },
    { action: 'Запустить отчёт по продажам', cost: '1', heavy: false },
    { action: 'Выгрузить 10 000 строк в Excel', cost: '10–20', heavy: true },
    { action: 'Импорт прайса на 50 000 позиций', cost: '30–50', heavy: true },
    { action: 'Пересчёт сводной таблицы с формулами', cost: '5–10', heavy: true },
  ]

  const userTypes = [
    {
      role: 'Оператор / поддержка',
      actionsPerHour: '40–60',
      examples: 'Ответы, закрытие тикетов, открытие чатов',
    },
    {
      role: 'Менеджер по продажам',
      actionsPerHour: '20–40',
      examples: 'Заполнение CRM, email, звонки',
    },
    {
      role: 'Планово-экономический отдел',
      actionsPerHour: '15–30',
      examples: 'Открытие таблиц, расчёты, выгрузки, формирование отчётов',
      highlighted: true,
    },
  ]

  return (
    <div className="overflow-hidden">
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.08)_0%,transparent_70%)]" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-500 dark:text-blue-400 text-sm font-medium mb-6"
            >
              <Zap size={14} className="fill-current" />
              <span>Прозрачная тарификация</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8"
            >
              Как работают <span className="text-blue-500 italic">токены</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-3xl mx-auto text-lg md:text-xl text-slate-500 dark:text-slate-400 leading-relaxed mb-10"
            >
              Токен — единица измерения активности в платформе. Одно действие пользователя
              стоит один токен. Тяжёлые операции (импорт, выгрузка больших объёмов) могут
              стоить больше.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a
                href="/#pricing"
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 group"
              >
                Посмотреть тарифы
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </a>
              <Link
                to="/"
                className="w-full sm:w-auto px-8 py-4 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold rounded-xl transition-all text-center"
              >
                На главную
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What is a token */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Что такое токен?</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Простая и честная единица тарификации
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: '1 действие = 1 токен',
                desc: 'Большинство действий стоят ровно один токен: открыть таблицу, создать запись, запустить отчёт.',
              },
              {
                icon: BarChart3,
                title: 'Тяжёлые операции стоят больше',
                desc: 'Импорт десятков тысяч строк или выгрузка в Excel расходует 10–50 токенов — пропорционально объёму работы.',
              },
              {
                icon: Info,
                title: 'Токены не сгорают',
                desc: 'Неиспользованные токены переносятся на следующий период и не сгорают в конце месяца.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-blue-500/30 transition-all shadow-sm dark:shadow-none"
              >
                <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500 mb-6">
                  <item.icon size={28} />
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Action costs table */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Стоимость действий в токенах</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Большинство операций стоят 1 токен. Тяжёлые действия — дороже.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 overflow-hidden shadow-sm dark:shadow-none">
              <div className="grid grid-cols-2 bg-slate-50 dark:bg-slate-900/50 px-8 py-4 border-b border-slate-200 dark:border-slate-800">
                <span className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Действие</span>
                <span className="text-xs font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 text-right">Токенов</span>
              </div>
              {actionCosts.map((row, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className={`grid grid-cols-2 px-8 py-5 border-b border-slate-100 dark:border-slate-900 last:border-0 ${row.heavy ? 'bg-amber-50/40 dark:bg-amber-900/10' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    {row.heavy && (
                      <span className="text-amber-500 flex-shrink-0">
                        <Zap size={14} className="fill-current" />
                      </span>
                    )}
                    <span className={`text-sm ${row.heavy ? 'font-semibold text-slate-800 dark:text-slate-100' : 'text-slate-600 dark:text-slate-300'}`}>
                      {row.action}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className={`text-sm font-bold ${row.heavy ? 'text-amber-600 dark:text-amber-400' : 'text-blue-500'}`}>
                      {row.cost}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-4 italic">
              Молния — тяжёлые операции, которые расходуют больше одного токена
            </p>
          </div>
        </div>
      </section>

      {/* User types / consumption */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Сколько токенов расходует сотрудник?</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
              Расход зависит от типа деятельности. Исследование ActivTrak (135 000 пользователей)
              подтверждает: сотрудник продуктивно работает ~6,5 часов в день из 8.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4 mb-12">
            {userTypes.map((user, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-6 rounded-2xl border ${user.highlighted
                  ? 'border-blue-500/40 bg-blue-50/50 dark:bg-blue-900/10'
                  : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950'
                } flex flex-col sm:flex-row sm:items-center gap-4 shadow-sm dark:shadow-none`}
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500">
                  <Users size={20} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-800 dark:text-slate-100">
                    {user.role}
                    {user.highlighted && (
                      <span className="ml-2 text-xs font-black uppercase tracking-widest text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-full">
                        типичный пример
                      </span>
                    )}
                  </div>
                  <div className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{user.examples}</div>
                </div>
                <div className="flex items-center gap-2 text-right flex-shrink-0">
                  <Clock size={14} className="text-slate-400" />
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                    {user.actionsPerHour} действий/час
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto p-8 rounded-3xl border border-blue-500/20 bg-blue-50/50 dark:bg-blue-900/10">
            <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-100">
              Пример расчёта для ПЭО
            </h3>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              Сотрудник ПЭО делает ~20 действий в час × 6,5 продуктивных часов = <strong>~130 действий в день</strong>.
              За 22 рабочих дня это около 2 860 токенов — бесплатный тариф «Знакомство» (3 000 токенов) покрывает
              одного такого сотрудника на месяц.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing plans */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Тарифы по токенам</h2>
            <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto italic">
              Выберите план под размер вашей команды
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-8 rounded-3xl flex flex-col relative ${plan.highlight
                  ? 'border-2 border-blue-600 bg-white dark:bg-slate-950 shadow-[0_0_50px_-12px_rgba(37,99,235,0.3)]'
                  : 'border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm dark:shadow-none hover:border-slate-300 dark:hover:border-slate-700 transition-all'
                }`}
              >
                {plan.highlight && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                    Популярно
                  </div>
                )}

                <h3 className="text-xl font-bold mb-1">{plan.name}</h3>
                <p className="text-slate-400 dark:text-slate-500 text-sm mb-6">{plan.description}</p>

                <div className="mb-2 flex items-baseline gap-2">
                  <span className="text-4xl font-black text-slate-900 dark:text-white">{plan.price}</span>
                  <span className="text-slate-400 dark:text-slate-500 text-xl font-bold">{plan.currency}/мес</span>
                </div>

                <div className="mb-6 text-2xl font-bold text-blue-500">
                  {plan.tokens} <span className="text-base font-medium text-slate-400">токенов</span>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {[
                    `${plan.perDay} токенов в день`,
                    plan.users,
                  ].map((item, j) => (
                    <li key={j} className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                      <CheckCircle2 size={14} className="text-blue-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>

                <a
                  href="/#cta"
                  className={`w-full py-4 font-bold rounded-xl transition-all text-center block ${plan.highlight
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20'
                    : 'bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-600 text-slate-800 dark:text-white'
                  }`}
                >
                  Начать
                </a>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-sm text-slate-400 dark:text-slate-500 mt-10 italic">
            Нужно больше токенов? Свяжитесь с нами — подберём индивидуальный план.
          </p>
        </div>
      </section>

      {/* FAQ / answer for clients */}
      <section className="py-24 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ответ клиенту коротко</h2>
          </div>

          <motion.blockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-8 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm dark:shadow-none text-slate-600 dark:text-slate-300 leading-relaxed italic text-lg"
          >
            «Сотрудник ПЭО в обычный день делает примерно 100–150 действий: открыл таблицу, создал запись,
            сформировал отчёт. Бесплатных 3 000 токенов хватит на одного такого сотрудника. Если выгружаете
            много данных (импорты на десятки тысяч строк) — каждое такое действие стоит 10–50 токенов, тогда
            расход выше. Но даже в этом случае тарифа Стартап за 1 950 ₽ хватит на 2–3 сотрудников ПЭО при
            обычной работе.»
          </motion.blockquote>

          <div className="mt-10 text-center">
            <a
              href="/#cta"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/20 transition-all group"
            >
              Заказать демо
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
