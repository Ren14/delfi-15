import { useState, useRef } from 'react'
import { SectionTitle } from '../components/UI'
import iconoMP from '../assets/photos/icono_mp.png'

// ── Completá con los datos reales ──────────────────
const GIFT_INFO = [
  { label: 'Banco',   value: 'Banco Galicia' },
  { label: 'CBU',     value: '0000000000000000000000' },
  { label: 'Alias',   value: 'delfi.2511.mp' },
  { label: 'Titular', value: 'Delfi' },
]
// ───────────────────────────────────────────────────

export default function GiftInfo() {
  const [open,   setOpen]   = useState(false)
  const [copied, setCopied] = useState(false)
  const timeoutRef = useRef(null)

  const copyAlias = () => {
    const text = 'delfi.2511.mp'

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).catch(() => fallbackCopy(text))
    } else {
      fallbackCopy(text)
    }

    setCopied(true)
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setCopied(false), 2000)
  }

  const fallbackCopy = (text) => {
    const el = document.createElement('textarea')
    el.value = text
    el.style.position = 'fixed'
    el.style.opacity  = '0'
    document.body.appendChild(el)
    el.focus()
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }

  return (
    <section
      className="relative z-10 py-20 px-6 text-center"
      style={{ borderTop: '1px solid rgba(249,168,212,0.12)' }}
    >
      <SectionTitle>Un detalle</SectionTitle>

      <div className="max-w-sm mx-auto">
        {/* Texto superior */}
        <p
          className="font-cormorant text-violet-800 leading-relaxed mb-8"
          style={{ fontSize: 'clamp(23px, 4.6vw, 31px)' }}
        >
          Tu presencia es<br />
          mi mejor regalo...<br />
          <br />
          Pero si deseas<br />
          hacerme uno..<br />
          te comparto mi alias
        </p>
        <div className="flex flex-col items-center gap-3 mb-8">
          <span
            onClick={copyAlias}
            className="font-montserrat font-bold tracking-widest px-6 py-3 rounded-2xl cursor-pointer transition-transform hover:scale-105 active:scale-95"
            style={{
              fontSize:      '1.4rem',
              background:    'linear-gradient(135deg, #f472b6, #e879f9)',
              color:         '#fff',
              boxShadow:     '0 4px 20px rgba(244,114,182,0.4)',
              letterSpacing: '0.12em',
            }}
          >
            delfi.2511.mp
          </span>

          {copied && (
            <span className="text-sm font-montserrat font-semibold" style={{ color: '#16a34a' }}>
              ✓ Alias copiado
            </span>
          )}

          {/* Mercado Pago */}
          <img
            src={iconoMP}
            alt="Mercado Pago"
            style={{ height: '22px', opacity: 0.75 }}
          />
        </div>
      </div>

      {/* Modal con info */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 flex items-center justify-center z-50 px-6"
          style={{ background: 'rgba(0,0,0,0.4)' }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-3xl p-8 text-left"
            style={{
              background: 'linear-gradient(135deg, #fff5f8, #fdf0f5)',
              border:     '1.5px solid rgba(109,40,217,0.2)',
              boxShadow:  '0 20px 60px rgba(0,0,0,0.15)',
            }}
          >
            <div className="text-4xl text-center mb-4">🎀</div>
            <h3
              className="font-cormorant text-violet-900 font-semibold text-center mb-6"
              style={{ fontSize: '1.5rem' }}
            >
              Info para el regalo
            </h3>

            <div className="flex flex-col gap-3 mb-6">
              {GIFT_INFO.map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center gap-4">
                  <span className="text-violet-500 text-xs uppercase tracking-widest font-montserrat">
                    {label}
                  </span>
                  <span className="font-cormorant text-violet-900 font-semibold text-lg">
                    {value}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setOpen(false)}
              className="w-full py-3 rounded-xl text-white font-bold text-sm uppercase tracking-widest"
              style={{
                background: 'linear-gradient(135deg, #f472b6, #e879f9)',
                border:     'none',
                cursor:     'pointer',
                fontFamily: 'Montserrat, sans-serif',
              }}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
