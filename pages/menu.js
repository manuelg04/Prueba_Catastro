import Link from "next/link"
import styles from "../styles/menu.module.css";
import React from 'react';

export default function Menu() {
    
  return (
  

  <header className={styles.header}> 
        <div className="contenedor">
          <div>
          </div>
          <nav className={styles.navegacion}>
            <Link className="link" href="/predios"> Predios</Link>
            <Link className="link" href="/construcciones">Construcciones</Link>
            <Link className="link" href="/terreno">terrenos</Link>
            <Link className="link" href="/propietarios">propietarios</Link>

          </nav>
        </div>
      </header>
  )
}

