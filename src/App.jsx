import './App.css'

function App() {
  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">Regional Andino</p>

        <h1>ARTESANÍAS LAU</h1>

        <p className="heroText">
          Productos artesanales, textiles, mates y artículos regionales seleccionados
          en Salta Capital.
        </p>

        <div className="heroActions">
          <a href="#productos" className="button primary">
            Ver productos
          </a>

          <a href="#whatsapp" className="button secondary">
            Consultar por WhatsApp
          </a>
        </div>
      </section>
    </main>
  )
}

export default App