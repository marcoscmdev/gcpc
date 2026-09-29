function Boton({ children, className = '', ...props }) {
  return (
    <button
      className={`rounded-lg bg-accent px-4 py-2 font-display font-bold uppercase tracking-wide text-bg transition-colors hover:bg-accent-hover ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

export { Boton }
