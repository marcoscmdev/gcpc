function Campo({ label, className = '', ...props }) {
  return (
    <label className="block">
      {label && (
        <span className="mb-1 block text-[11px] font-medium uppercase tracking-wide text-text-secondary">
          {label}
        </span>
      )}
      <input
        className={`w-full rounded-lg border border-border bg-bg px-3 py-2 text-text placeholder-text-muted focus:border-accent focus:outline-none ${className}`}
        {...props}
      />
    </label>
  )
}

export { Campo }
