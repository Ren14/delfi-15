import { useState } from 'react'
import { SectionTitle } from '../components/UI'

const WA_NUMBER = '5492613474123' // Reemplazá con el número real (sin + ni espacios)

const inputClass = `
  w-full px-5 py-4 rounded-xl text-violet-900 outline-none text-base font-montserrat
`

const inputStyle = {
  background: 'rgba(255,255,255,0.75)',
  border:     '2px solid rgba(109,40,217,0.25)',
  fontFamily: 'Montserrat, sans-serif',
}

export default function RSVP() {
  const [name,      setName]    = useState('')
  const [guests,    setGuests]  = useState('1')
  const [attend,    setAttend]  = useState('si')
  const [submitted, setSubmit]  = useState(false)

  const handleSubmit = () => {
    if (!name.trim()) { alert('Por favor, ingresá tu nombre.'); return }

    const message = attend === 'si'
      ? `Hola! Soy ${name.trim()}. Confirmo asistencia a los 15 de Delfi 🌸`
      : `Hola! Soy ${name.trim()}. Lamentablemente no voy a poder asistir 😢`

    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`, '_blank')

    setSubmit(true)
  }

  if (submitted) return (
    <section
      className="relative z-10 py-20 px-6 text-center"
      style={{ borderTop: '1px solid rgba(249,168,212,0.12)' }}
    >
      <SectionTitle>¡Gracias!</SectionTitle>
      <div className="text-6xl my-4">🎉</div>
      <p className="font-cormorant text-violet-900 text-xl leading-relaxed">
        {attend === 'si'
          ? `¡${name}, te esperamos! Va a ser una noche inolvidable.`
          : `${name}, gracias por avisarnos. ¡Te vamos a extrañar!`}
      </p>
    </section>
  )

  return (
    <section
      id="rsvp"
      className="relative z-10 py-20 px-6 text-center"
      style={{ borderTop: '1px solid rgba(249,168,212,0.12)' }}
    >
      <SectionTitle>¿Vas a venir?</SectionTitle>
      <p className="text-violet-600 text-sm mb-10">
        Confirmá tu asistencia antes del 20 de Septiembre
      </p>

      <div className="max-w-sm mx-auto flex flex-col gap-4">
        {/* Name */}
        <input
          className={inputClass}
          style={inputStyle}
          type="text"
          placeholder="Delfi"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Yes / No toggle */}
        <div className="flex gap-3">
          {[
            { val: 'si', label: '✅ Sí, voy!' },
            { val: 'no', label: '❌ No puedo' },
          ].map(({ val, label }) => (
            <button
              key={val}
              onClick={() => setAttend(val)}
              className="flex-1 py-4 rounded-xl text-base transition-all"
              style={{
                border:     `2px solid ${attend === val ? '#f472b6' : 'rgba(249,168,212,0.2)'}`,
                background: attend === val
                  ? 'linear-gradient(135deg, #f472b6, #e879f9)'
                  : 'rgba(255,255,255,0.05)',
                color:      attend === val ? '#fff' : '#4c1d95',
                fontFamily: 'Montserrat, sans-serif',
                cursor:     'pointer',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="w-full py-4 rounded-xl text-white font-bold text-base uppercase tracking-widest transition-transform hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #f472b6, #e879f9, #c084fc)',
            border:     'none',
            boxShadow:  '0 8px 30px rgba(244,114,182,0.4)',
            fontFamily: 'Montserrat, sans-serif',
            cursor:     'pointer',
          }}
        >
          Confirmar asistencia
        </button>
      </div>
    </section>
  )
}
