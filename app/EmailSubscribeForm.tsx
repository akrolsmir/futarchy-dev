'use client'

export default function EmailSubscribeForm() {
  return (
    <form
      className="mt-10 flex flex-col gap-2 justify-center items-center"
      onSubmit={async (e) => {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const email = new FormData(form).get('email')

        try {
          const response = await fetch('/api/email-drop', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email }),
          })

          if (response.ok) {
            form.reset()
            const message = document.createElement('p')
            message.className = 'text-green-400 text-sm mt-2'
            message.textContent = 'Thanks for subscribing!'
            form.appendChild(message)
            setTimeout(() => message.remove(), 3000)
          } else {
            const message = document.createElement('p')
            message.className = 'text-red-400 text-sm mt-2'
            message.textContent = 'Something went wrong. Please try again.'
            form.appendChild(message)
            setTimeout(() => message.remove(), 3000)
          }
        } catch (error) {
          const message = document.createElement('p')
          message.className = 'text-red-400 text-sm mt-2'
          message.textContent = 'Something went wrong. Please try again.'
          form.appendChild(message)
          setTimeout(() => message.remove(), 3000)
        }
      }}
    >
      <p className="text-slate-300 italic">Get notified when we add new markets</p>
      <div className="flex flex-row gap-2">
        <input
          type="email"
          name="email"
          placeholder="email"
          required
          className="px-4 py-2 rounded bg-slate-700 text-white placeholder:text-slate-400 border border-slate-600 focus:outline-none focus:border-slate-500"
        />
        <button
          type="submit"
          className="px-4 py-2 rounded bg-slate-600 hover:bg-slate-500 text-white font-medium transition-colors"
        >
          Subscribe
        </button>
      </div>
    </form>
  )
}