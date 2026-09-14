import React from 'react'
import {useState, useEffect } from 'react'

function Inicio() {
    const [tomos, setTomos] = useState([])

    useEffect(()=>{fetch("http://localhost:8080/api/tomos").
        then(response => response.json()).
        then(data => setTomos(data))
    },[])
    
    return (
    <div>
    <h1>Inicio</h1>
    {tomos.slice(0, 3).map(tomo => (
     <div key={tomo.id}>
  <h3>{tomo.nombre}</h3>
  {tomo.coverPath ? (
    <img src={tomo.coverPath} alt={tomo.nombre} />
  ) : (
    <p>Sin portada</p>
  )}
  <p>{tomo.editorial} — {tomo.anhoEdicion}</p>
</div>
    ))}
  </div>
)

}

export {Inicio}