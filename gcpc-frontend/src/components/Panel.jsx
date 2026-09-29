function Panel({ titulo, children, className = '' }) {
  return (
    <div className={`rounded-xl border border-border bg-surface p-6 ${className}`}>
      {titulo && (
        <h2 className="mb-4 text-base font-bold uppercase tracking-widest text-accent">{titulo}</h2>
      )}
      {children}
    </div>
  )
}

export { Panel }
