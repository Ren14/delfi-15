import { useState } from 'react'
import { SectionTitle } from '../components/UI'

import foto1 from '../assets/photos/foto1.png'
import foto2 from '../assets/photos/foto2.png'
import foto3 from '../assets/photos/foto3.png'
import foto4 from '../assets/photos/foto4.png'
import foto5 from '../assets/photos/foto5.png'
import foto6 from '../assets/photos/foto6.png'

const PHOTOS = [
  { id: 1, src: foto1, alt: 'Foto de Delfi 1' },
  { id: 2, src: foto2, alt: 'Foto de Delfi 2' },
  { id: 3, src: foto3, alt: 'Foto de Delfi 3' },
  { id: 4, src: foto4, alt: 'Foto de Delfi 4' },
  { id: 5, src: foto5, alt: 'Foto de Bianca 5' },
  { id: 6, src: foto6, alt: 'Foto de Bianca 6' },
]

const FALLBACK_BG = 'linear-gradient(135deg, #fce7f3, #f9a8d4)'

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
        <div
          className="w-full h-full flex items-center justify-center text-lg font-semibold"
          style={{ color: '#f472b6' }}
        >
          📸
        </div>
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

export default function Gallery() {
  const [active, setActive] = useState(null)

  return (
    <section
      className="relative z-10 py-20 px-6 text-center"
      style={{ borderTop: '1px solid rgba(249,168,212,0.12)' }}
    >
      <SectionTitle>Galería</SectionTitle>
      <p className="text-violet-600 text-sm mb-10">
        Algunos momentos especiales de Delfi ✨
      </p>

      <div
        className="grid gap-4 max-w-2xl mx-auto"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))' }}
      >
        {PHOTOS.map((photo) => (
          <PhotoCard
            key={photo.id}
            photo={photo}
            onClick={() => setActive(photo)}
          />
        ))}
      </div>

      {active && (
        <div
          onClick={() => setActive(null)}
          className="fixed inset-0 flex items-center justify-center z-50"
          style={{ background: 'rgba(0,0,0,0.85)' }}
        >
          <img
            src={active.src}
            alt={active.alt}
            className="rounded-3xl object-contain"
            style={{
              maxWidth:  '80vw',
              maxHeight: '80vh',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  )
}
