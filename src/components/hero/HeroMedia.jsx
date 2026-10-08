import { useEffect, useMemo, useRef, useState } from 'react'

// Média du hero de la page d'accueil (demande du 08/10/2026) : une boucle de vidéos
// (ex. 3 clips Pexels) qui s'enchaînent avec un fondu, au lieu d'une photo fixe.
//
// - La photo `image` reste affichée dessous : elle sert d'écran de chargement et de
//   solution de repli (pas de vidéo fournie, économiseur de données, connexion 2G,
//   « réduire les animations » activé, ou lecture automatique refusée).
// - Les vidéos sont muettes (obligatoire pour l'autoplay mobile) et en `playsInline`.
// - Seule la vidéo en cours et la suivante sont préchargées, pour ne pas alourdir la page.
const FADE_MS = 1000

export default function HeroMedia({ image, videos, alt }) {
  const [index, setIndex] = useState(0)
  const [prev, setPrev] = useState(null) // clip qui vient de se terminer : reste affiché sous le nouveau pendant le fondu
  const [started, setStarted] = useState(false)
  const refs = useRef([])

  const enabled = useMemo(() => {
    if (!videos || videos.length === 0) return false
    try {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
      const c = navigator.connection
      if (c && (c.saveData || /(^|-)2g$/.test(c.effectiveType || ''))) return false
    } catch {
      /* navigateur sans ces API : on tente la vidéo */
    }
    return true
  }, [videos])

  // Lance la vidéo active depuis le début ; met en pause les autres une fois le fondu terminé.
  useEffect(() => {
    if (!enabled) return undefined
    const current = refs.current[index]
    if (current) {
      try {
        current.currentTime = 0
      } catch {
        /* métadonnées pas encore chargées : la lecture démarrera au début */
      }
      const p = current.play()
      if (p && p.catch) p.catch(() => {})
    }
    const t = setTimeout(() => {
      // Fondu terminé : l'ancien clip peut disparaître ; on le remet au début, prêt pour le prochain tour.
      refs.current.forEach((v, i) => {
        if (v && i !== index) {
          v.pause()
          try {
            v.currentTime = 0
          } catch {
            /* ignoré */
          }
        }
      })
      setPrev(null)
    }, FADE_MS + 100)
    return () => clearTimeout(t)
  }, [index, enabled])

  return (
    <>
      <img
        src={image}
        alt={alt}
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center', display: 'block' }}
      />
      {enabled &&
        videos.map((src, i) => (
          <video
            key={src}
            ref={(el) => {
              refs.current[i] = el
            }}
            src={src}
            poster={image}
            muted
            playsInline
            autoPlay={i === 0}
            loop={videos.length === 1}
            preload={i === index || i === (index + 1) % videos.length ? 'auto' : 'metadata'}
            aria-hidden="true"
            onPlaying={() => i === 0 && setStarted(true)}
            onEnded={() => {
              setPrev(i)
              setIndex((cur) => (cur + 1) % videos.length)
            }}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              // Fondu d'entrée uniquement pour le nouveau clip, posé PAR-DESSUS l'ancien qui reste
              // à pleine opacité en dessous : à aucun moment la photo de fond n'est visible
              // (avec deux fondus croisés, les deux clips étaient semi-transparents en même temps).
              opacity: started && (i === index || i === prev) ? 1 : 0,
              zIndex: i === index ? 2 : i === prev ? 1 : 0,
              transition: i === index ? `opacity ${FADE_MS}ms ease` : 'none',
              pointerEvents: 'none',
            }}
          />
        ))}
    </>
  )
}
