// Redimensiona y recorta a cuadrado todas las imágenes de una carpeta,
// y las deja listas en public/img/<destino> con el nombre "slugificado".
//
// Uso:
//   node scripts/procesar-imagenes.js <carpeta-origen> <carpeta-destino-en-public> [tamano]
//
// Ejemplo (estilos):
//   node scripts/procesar-imagenes.js assets/estilos-originales public/img/estilos
//
// Ejemplo (personajes, tamaño 500px):
//   node scripts/procesar-imagenes.js assets/personajes-originales public/img/personajes 500

import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const EXTENSIONES_VALIDAS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif', '.gif'])

function slugificar(texto) {
  return texto
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

async function main() {
  const [carpetaOrigen, carpetaDestino, tamanoArg] = process.argv.slice(2)

  if (!carpetaOrigen || !carpetaDestino) {
    console.error('Uso: node scripts/procesar-imagenes.js <carpeta-origen> <carpeta-destino> [tamano]')
    process.exit(1)
  }

  const tamano = tamanoArg ? Number(tamanoArg) : 400
  const rutaOrigen = path.resolve(carpetaOrigen)
  const rutaDestino = path.resolve(carpetaDestino)

  await fs.mkdir(rutaDestino, { recursive: true })

  const todosLosArchivos = await fs.readdir(rutaOrigen)
  const archivos = todosLosArchivos.filter((archivo) =>
    EXTENSIONES_VALIDAS.has(path.extname(archivo).toLowerCase())
  )
  const ignorados = todosLosArchivos.filter((archivo) => !archivos.includes(archivo))

  if (ignorados.length > 0) {
    console.log('Ignorados (sin extensión reconocida, revísalos a mano):')
    ignorados.forEach((archivo) => console.log(`  - ${archivo}`))
  }

  if (archivos.length === 0) {
    console.log(`No hay imágenes procesables en ${rutaOrigen}`)
    return
  }

  console.log(`Procesando ${archivos.length} imagen(es) a ${tamano}x${tamano}px...`)

  for (const archivo of archivos) {
    const nombreBase = path.basename(archivo, path.extname(archivo))
    const nombreSalida = `${slugificar(nombreBase)}.jpg`
    const rutaEntrada = path.join(rutaOrigen, archivo)
    const rutaSalida = path.join(rutaDestino, nombreSalida)

    await sharp(rutaEntrada)
      .resize(tamano, tamano, { fit: 'cover', position: 'attention' })
      .jpeg({ quality: 85 })
      .toFile(rutaSalida)

    console.log(`  ${archivo} -> ${path.relative(process.cwd(), rutaSalida)}`)
  }

  console.log('Listo.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
