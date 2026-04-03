import { useState, useEffect } from 'react'

const STORAGE_KEY = 'cookie_consent'

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true)
    }
  }, [])

  function handleAccept() {
    localStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between gap-4 px-4 py-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shadow-lg transition-colors duration-300">
      <span className="text-sm text-slate-700 dark:text-slate-300">
        Мы используем куки для обеспечения работы сайта. Продолжая использовать сайт, вы соглашаетесь с их использованием.
      </span>
      <button
        type="button"
        onClick={handleAccept}
        className="shrink-0 bg-blue-600 hover:bg-blue-700 text-white border-none rounded-md px-5 py-2 text-sm cursor-pointer transition-colors duration-200 whitespace-nowrap"
      >
        Принять
      </button>
    </div>
  )
}
