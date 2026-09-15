import { useState, useEffect, useCallback } from 'react'
import { SectionTitle } from '../components/UI'

import foto1 from '../assets/photos/foto1.png'
import foto2 from '../assets/photos/foto2.png'
import foto3 from '../assets/photos/foto3.png'
import foto4 from '../assets/photos/foto4.png'

const PHOTOS = [
  { id: 1, src: foto1, alt: 'Foto de Delfi 1' },
  { id: 2, src: foto2, alt: 'Foto de Delfi 2' },
  { id: 3, src: foto3, alt: 'Foto de Delfi 3' },
  { id: 4, src: foto4, alt: 'Foto de Delfi 4' },
  
]

const FALLBACK_BG = 'linear-gradient(135deg, #fce7f3, #f9a8d4)'

// ── Miniatura de la grilla ────────────────────────────────────
function PhotoCard({ photo, onClick }) {
  const [error, setError] = useState(false)

  return (
    <div
      onClick={onClick}
      className="rounded-2xl overflow-hidden cursor-pointer transition-transform hover:scale-105"
      style={{
        aspectRatio: '1',
        border:      '1.5px solid rgba(249,168,212,0.3)',
        boxShadow:   '0 4px 20px rgba(232,121,249,0.15)',
        background:  error ? FALLBACK_BG : undefined,
      }}
    >
      {error ? (
        <div className="w-full h-full flex items-center justify-center text-2xl">📸</div>
      ) : (
        <img
          src={photo.src}
          alt={photo.alt}
          className="w-full h-full object-cover"
          onError={() => setError(true)}
        />
      )}
    </div>
  )
}

// ── Botón de navegación del lightbox ─────────────────────────
function NavBtn({ direction, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center justify-center rounded-full transition-all hover:scale-110"
      style={{
        width:      '48px',
        height:     '48px',
        background: 'rgba(255,255,255,0.12)',
        border:     '1.5px solid rgba(249,168,212,0.35)',
        color:      '#f9a8d4',
        fontSize:   '22px',
        cursor:     'pointer',
        backdropFilter: 'blur(8px)',
        flexShrink: 0,
      }}
    >
      {direction === 'prev' ? '‹' : '›'}
    </button>
  )
}

// ── Lightbox con carrusel ─────────────────────────────────────
function Lightbox({ index, onClose, onPrev, onNext }) {
  const photo = PHOTOS[index]
  const [error, setError] = useState(false)

  // Resetear error al cambiar de foto
  useEffect(() => { setError(false) }, [index])

  // Navegación con teclado
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft')  onPrev()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'Escape')     onClose()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onPrev, onNext, onClose])

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 flex flex-col items-center justify-center z-50 gap-6"
      style={{ background: 'rgba(0,0,0,0.88)', padding: '24px' }}
    >
      {/* Contador */}
      <p style={{ color: 'rgba(249,168,212,0.7)', fontSize: '13px', letterSpacing: '0.15em' }}>
        {index + 1} / {PHOTOS.length}
      </p>

      {/* Fila: anterior + foto + siguiente */}
      <div
        className="flex items-center justify-center gap-5 w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <NavBtn direction="prev" onClick={onPrev} />

        <div
          className="rounded-3xl overflow-hidden flex items-center justify-center"
          style={{
            maxWidth:   '75vw',
            maxHeight:  '70vh',
            background: error ? FALLBACK_BG : 'transparent',
            boxShadow:  '0 20px 60px rgba(0,0,0,0.5)',
            minWidth:   '200px',
            minHeight:  '200px',
          }}
        >
          {error ? (
            <div className="flex items-center justify-center text-5xl p-12">📸</div>
          ) : (
            <img
              src={photo.src}
              alt={photo.alt}
              className="object-contain rounded-3xl"
              style={{ maxWidth: '75vw', maxHeight: '70vh' }}
              onError={() => setError(true)}
            />
          )}
        </div>

        <NavBtn direction="next" onClick={onNext} />
      </div>

      {/* Puntos indicadores */}
      <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
        {PHOTOS.map((_, i) => (
          <div
            key={i}
            style={{
              width:        i === index ? '20px' : '8px',
              height:       '8px',
              borderRadius: '4px',
              background:   i === index
                ? 'linear-gradient(135deg, #f472b6, #e879f9)'
                : 'rgba(249,168,212,0.3)',
              transition:   'all 0.3s',
              cursor:       'pointer',
            }}
            onClick={() => {/* podría agregarse onJump(i) */}}
          />
        ))}
      </div>

      {/* Hint cerrar */}
      <p style={{ color: 'rgba(255,255,255,0.25)', fontSize: '12px' }}>
        Click afuera o ESC para cerrar · ← → para navegar
      </p>
    </div>
  )
}

// ── Componente principal ──────────────────────────────────────
export default function Gallery() {
  const [activeIndex, setActiveIndex] = useState(null)

  const isOpen = activeIndex !== null

  const handlePrev = useCallback(() => {
    setActiveIndex((i) => (i - 1 + PHOTOS.length) % PHOTOS.length)
  }, [])

  const handleNext = useCallback(() => {
    setActiveIndex((i) => (i + 1) % PHOTOS.length)
  }, [])

  const handleClose = useCallback(() => setActiveIndex(null), [])

  return (
    <section
      className="relative z-10 py-20 px-6 text-center"
      style={{ borderTop: '1px solid rgba(249,168,212,0.12)' }}
    >
      <SectionTitle>Galería</SectionTitle>
      <p className="text-purple-400 text-sm mb-10">
        Algunos momentos especiales de Delfi ✨
      </p>

      {/* Grilla */}
      <div
        className="grid gap-4 max-w-2xl mx-auto"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))' }}
      >
        {PHOTOS.map((photo, i) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>

      {/* Lightbox */}
      {isOpen && (
        <Lightbox
          index={activeIndex}
          onClose={handleClose}
          onPrev={handlePrev}
          onNext={handleNext}
        />
      )}
    </section>
  )
}
