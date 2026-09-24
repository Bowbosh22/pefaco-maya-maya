const counterButtonStyle = {
  width: 34,
  height: 34,
  borderRadius: '50%',
  border: '1px solid var(--line)',
  background: 'var(--ivory)',
  color: 'var(--espresso)',
  fontSize: 18,
  lineHeight: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
}

export default function GuestCounterRow({ label, sublabel, value, min, onChange }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '18px 0', borderBottom: '1px solid var(--line)' }}>
      <div>
        <p style={{ fontFamily: 'var(--serif)', fontSize: 17, color: 'var(--espresso)' }}>{label}</p>
        {sublabel && (
          <p className="t-body" style={{ fontSize: 12, marginTop: 2 }}>
            {sublabel}
          </p>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <button type="button" aria-label={`Diminuer — ${label}`} onClick={() => onChange(Math.max(min, value - 1))} style={counterButtonStyle}>
          −
        </button>
        <span style={{ width: 22, textAlign: 'center', fontFamily: 'var(--serif)', fontSize: 18, color: 'var(--espresso)' }}>{value}</span>
        <button type="button" aria-label={`Augmenter — ${label}`} onClick={() => onChange(value + 1)} style={counterButtonStyle}>
          +
        </button>
      </div>
    </div>
  )
}
