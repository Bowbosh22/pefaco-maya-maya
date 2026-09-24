import { selectorTheme as t, DOOR_OPEN_ROTATE_DEG, DOOR_HOVER_ROTATE_DEG } from '../data/hotels'

export default function DoorPanel({
  hotel,
  side,
  isOpening,
  isFadingOut,
  isHovered,
  disabled,
  onChoose,
  onHoverStart,
  onHoverEnd,
}) {
  const direction = side === 'left' ? -1 : 1
  const rotate = isOpening ? DOOR_OPEN_ROTATE_DEG : isHovered && !disabled ? DOOR_HOVER_ROTATE_DEG : 0

  return (
    <button
      type="button"
      onClick={() => onChoose(hotel, side)}
      onMouseEnter={() => onHoverStart(hotel.slug)}
      onMouseLeave={() => onHoverEnd(hotel.slug)}
      disabled={disabled}
      className={`door-panel door-${side}`}
      aria-label={`Découvrir ${hotel.name}`}
      style={{
        flex: 1,
        position: 'relative',
        border: 'none',
        padding: 0,
        overflow: 'hidden',
        cursor: disabled ? 'default' : 'pointer',
        transformOrigin: side === 'left' ? 'left center' : 'right center',
        transform: `rotateY(${direction * rotate}deg)`,
        opacity: isFadingOut ? 0 : 1,
        transition: isOpening
          ? 'transform 950ms cubic-bezier(.65,0,.35,1)'
          : 'transform 0.5s ease, opacity 0.6s ease',
        backfaceVisibility: 'hidden',
        background: t.bg,
      }}
    >
      <div
        className="door-image"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(180deg, rgba(18,24,15,0.4) 0%, rgba(18,24,15,0.8) 100%), url(${hotel.heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'saturate(0.82) sepia(0.1)',
          transition: 'transform 0.8s ease, filter 0.8s ease',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 'clamp(10px,1.6vw,20px)',
          border: `1px solid ${t.line}`,
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          [side === 'left' ? 'right' : 'left']: 'clamp(18px,3vw,36px)',
          width: 2,
          height: 64,
          borderRadius: 2,
          background: t.gold,
          opacity: 0.75,
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: 'clamp(20px,4vw,40px)',
          color: t.ivory,
        }}
      >
        {!hotel.officialPhotos && (
          <span
            style={{
              position: 'absolute',
              top: 'clamp(24px,4vw,40px)',
              background: 'rgba(245,240,230,0.88)',
              color: t.bgDeep,
              fontSize: 10,
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              padding: '6px 13px',
              borderRadius: 2,
            }}
          >
            Photos provisoires
          </span>
        )}
        <p
          style={{
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: t.goldSoft,
            marginBottom: 16,
          }}
        >
          {hotel.city}
        </p>
        <h2
          style={{
            fontFamily: 'var(--serif)',
            fontStyle: 'italic',
            fontWeight: 400,
            fontSize: 'clamp(24px,3.2vw,36px)',
            marginBottom: 16,
            color: t.ivory,
          }}
        >
          {hotel.name}
        </h2>
        <p
          style={{
            color: 'rgba(245,240,230,0.65)',
            fontSize: 14,
            lineHeight: 1.6,
            maxWidth: 320,
            marginBottom: 26,
            fontWeight: 300,
          }}
        >
          {hotel.heroTagline}
        </p>
        <span
          style={{
            fontSize: 12,
            fontWeight: 400,
            letterSpacing: '0.06em',
            color: t.ivory,
            borderBottom: `1px solid ${t.gold}`,
            paddingBottom: 5,
          }}
        >
          Entrer
        </span>
      </div>
    </button>
  )
}
