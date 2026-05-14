import { useRef, useState } from 'react'
import './App.css'
import { categories } from './data/categories'
import { products } from './data/products'

const WHATSAPP_NUMBER = '5490000000000'

const businessAddress = 'Av. San Martín 2552, Salta Capital, Argentina'

const mapsUrl =
  'https://www.google.com/maps/search/?api=1&query=Av.%20San%20Mart%C3%ADn%202552%2C%20Salta%20Capital%2C%20Argentina'

const socialLinks = [
  {
    name: 'Instagram',
    url: '#',
  },
  {
    name: 'TikTok',
    url: '#',
  },
  {
    name: 'Facebook',
    url: '#',
  },
]

function createWhatsAppLink(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

function getCategoryName(categoryId) {
  const category = categories.find((item) => item.id === categoryId)
  return category ? category.name : 'Producto regional'
}

function App() {
  const [selectedCategory, setSelectedCategory] = useState(null)

  const categoriesSectionRef = useRef(null)
  const productsSectionRef = useRef(null)

  const visibleProducts = products.filter((product) => product.visible)
  const featuredProducts = visibleProducts.filter((product) => product.featured)

  const filteredProducts = selectedCategory
    ? visibleProducts.filter((product) => product.categoryId === selectedCategory)
    : []

  const selectedCategoryName = selectedCategory
    ? getCategoryName(selectedCategory)
    : 'Elegí una categoría'

  const productsToShow =
    selectedCategory === 'todos' ? visibleProducts : filteredProducts

  function scrollToCategories() {
    categoriesSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  function scrollToProducts() {
    productsSectionRef.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  function handleSelectCategory(categoryId) {
    setSelectedCategory(categoryId)

    setTimeout(() => {
      scrollToProducts()
    }, 100)
  }

  function handleShowAllProducts() {
    setSelectedCategory('todos')

    setTimeout(() => {
      scrollToProducts()
    }, 100)
  }

  function handleSocialClick(event, url) {
    if (url === '#') {
      event.preventDefault()
      alert('Pronto vamos a agregar el link real de esta red social.')
    }
  }

  return (
    <main className="page">
      <section className="hero" id="inicio">
        <p className="eyebrow">Regional Andino</p>

        <h1>ARTESANÍAS LAU</h1>

        <p className="heroText">
          Productos artesanales, textiles, mates y artículos regionales seleccionados
          en Salta Capital.
        </p>

        <div className="heroActions">
          <a href="#destacados" className="button primary">
            Ver destacados
          </a>

          <a href="#categorias" className="button secondary">
            Ver categorías
          </a>

          <a
            href={createWhatsAppLink(
              'Hola, vi la página de Artesanías Lau y quiero hacer una consulta.'
            )}
            className="button whatsapp"
            target="_blank"
            rel="noreferrer"
          >
            Consultar WhatsApp
          </a>
        </div>

        <nav className="quickNav" aria-label="Navegación rápida">
  <a href="#sobre">Sobre el local</a>
  <a href="#envios">Entregas</a>
  <a href="#ubicacion">Ubicación</a>
</nav>

        <div className="heroSocials">
          <span>También podés encontrarnos en:</span>

          <div className="socialLinks">
            {socialLinks.map((social) => (
              <a
                href={social.url}
                key={social.name}
                className="socialLink"
                onClick={(event) => handleSocialClick(event, social.url)}
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section sectionAlt" id="destacados">
        <div className="sectionHeader">
          <p className="eyebrow">Selección</p>
          <h2>Productos destacados</h2>
          <p>
            Algunos artículos seleccionados para consultar por disponibilidad,
            colores, modelos y medidas.
          </p>
        </div>

        <div className="productGrid">
          {featuredProducts.map((product) => (
            <article className="productCard" key={product.id}>
              <div className="productImage">
                <span>Foto del producto</span>
              </div>

              <div className="productContent">
                <p className="productCategory">{getCategoryName(product.categoryId)}</p>
                <h3>{product.name}</h3>
                <p>{product.description}</p>

                <div className="productTags">
                  <span>Consultar precio</span>
                  {product.consultAvailability && <span>Consultar disponibilidad</span>}
                </div>

                <a
                  className="productButton"
                  href={createWhatsAppLink(
                    `Hola, vi la página de Artesanías Lau y quiero consultar por este producto: ${product.name}.`
                  )}
                  target="_blank"
                  rel="noreferrer"
                >
                  Consultar por WhatsApp
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="sectionTools sectionToolsBottom">
          <a className="backButton" href="#categorias">
            Ver categorías
          </a>

          <a className="backButton" href="#inicio">
            Volver arriba
          </a>
        </div>
      </section>

      <section className="section" id="categorias" ref={categoriesSectionRef}>
        <div className="sectionHeader">
          <p className="eyebrow">Catálogo</p>
          <h2>Categorías principales</h2>
          <p>
            Tocá una categoría para ver solamente los productos de esa sección.
          </p>
        </div>

        <div className="categoryGrid">
          {categories.map((category) => (
            <button
              className={`categoryCard ${selectedCategory === category.id ? 'active' : ''}`}
              key={category.id}
              onClick={() => handleSelectCategory(category.id)}
            >
              <h3>{category.name}</h3>
              <p>{category.description}</p>
            </button>
          ))}
        </div>

        <div className="showAllWrapper">
          <button className="showAllButton" onClick={handleShowAllProducts}>
            Ver todos los productos
          </button>
        </div>
      </section>

      <section className="section sectionAlt" id="productos" ref={productsSectionRef}>
        <div className="sectionHeader">
          <p className="eyebrow">Productos</p>
          <h2>{selectedCategory === 'todos' ? 'Todos los productos' : selectedCategoryName}</h2>
          <p>
            Los productos pueden variar según stock, medidas, colores y modelos.
            Recomendamos consultar antes de visitar.
          </p>
        </div>

        {selectedCategory && (
          <div className="sectionTools">
            <button className="backButton" onClick={scrollToCategories}>
              Volver a categorías
            </button>

            <a className="backButton" href="#inicio">
              Volver arriba
            </a>
          </div>
        )}

        {productsToShow.length === 0 ? (
          <div className="emptyState">
            <h3>Seleccioná una categoría</h3>
            <p>
              Elegí una categoría del catálogo para ver los productos disponibles
              dentro de esa sección.
            </p>
          </div>
        ) : (
          <>
            <div className="productGrid">
              {productsToShow.map((product) => (
                <article className="productCard" key={product.id}>
                  <div className="productImage">
                    <span>Foto del producto</span>
                  </div>

                  <div className="productContent">
                    <p className="productCategory">{getCategoryName(product.categoryId)}</p>
                    <h3>{product.name}</h3>
                    <p>{product.description}</p>

                    <div className="productTags">
                      <span>Consultar precio</span>
                      {product.consultAvailability && <span>Consultar disponibilidad</span>}
                    </div>

                    <a
                      className="productButton"
                      href={createWhatsAppLink(
                        `Hola, vi la página de Artesanías Lau y quiero consultar por este producto: ${product.name}.`
                      )}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Consultar por WhatsApp
                    </a>
                  </div>
                </article>
              ))}
            </div>

            <div className="sectionTools sectionToolsBottom">
              <button className="backButton" onClick={scrollToCategories}>
                Volver a categorías
              </button>

              <a className="backButton" href="#inicio">
                Volver arriba
              </a>
            </div>
          </>
        )}
      </section>

      <section className="section" id="sobre">
        <div className="sectionHeader">
          <p className="eyebrow">Local familiar</p>
          <h2>Sobre Artesanías Lau</h2>
          <p>
            Un espacio en Salta Capital con productos regionales, textiles, mates,
            artículos para el hogar y opciones seleccionadas para regalo.
          </p>
        </div>

        <div className="infoGrid">
          <article className="infoCard">
            <h3>Selección regional</h3>
            <p>
              Trabajamos con una variedad de artículos tradicionales, textiles,
              mates, madera, aguayo y productos regionales seleccionados.
            </p>
          </article>

          <article className="infoCard">
            <h3>Consulta directa</h3>
            <p>
              Como los modelos, colores y disponibilidad pueden cambiar, recomendamos
              consultar por WhatsApp antes de visitar o realizar una compra.
            </p>
          </article>

          <article className="infoCard">
            <h3>Productos para regalar</h3>
            <p>
              Contamos con opciones para uso personal, decoración, regalos,
              recuerdos regionales y artículos tradicionales.
            </p>
          </article>
        </div>

        <div className="sectionTools sectionToolsBottom">
          <a className="backButton" href="#categorias">
            Ver categorías
          </a>

          <a className="backButton" href="#inicio">
            Volver arriba
          </a>
        </div>
      </section>

      <section className="section sectionAlt" id="envios">
        <div className="sectionHeader">
          <p className="eyebrow">Consultas y entregas</p>
          <h2>Entregas y envíos</h2>
          <p>
            Realizamos entregas en Salta Capital según zona y disponibilidad.
            Para envíos fuera de Salta, consultar según producto, cantidad y costo
            de envío.
          </p>
        </div>

        <div className="centerActions">
          <a
            href={createWhatsAppLink(
              'Hola, vi la página de Artesanías Lau y quiero consultar por entregas o envíos.'
            )}
            className="button whatsapp"
            target="_blank"
            rel="noreferrer"
          >
            Consultar entregas por WhatsApp
          </a>
        </div>

        <div className="sectionTools sectionToolsBottom">
          <a className="backButton" href="#ubicacion">
            Ver ubicación
          </a>

          <a className="backButton" href="#inicio">
            Volver arriba
          </a>
        </div>
      </section>

      <section className="section" id="ubicacion">
        <div className="sectionHeader">
          <p className="eyebrow">Dónde estamos</p>
          <h2>Ubicación y horarios</h2>
          <p>
            Nos encontrás en Salta Capital. Recomendamos consultar antes de visitar,
            ya que la disponibilidad de productos puede variar.
          </p>
        </div>

        <div className="locationCard">
          <div>
            <h3>ARTESANÍAS LAU</h3>
            <p>{businessAddress}</p>
          </div>

          <div>
            <h3>Horario aproximado</h3>
            <p>9:30 a 20:30. Consultar antes de visitar.</p>
          </div>

          <div className="mapPlaceholder">
            <strong>Av. San Martín 2552</strong>
            <span>Salta Capital</span>
            <p>
              Evitamos mostrar una foto automática de Google porque puede no representar
              bien el local. Usá el botón para abrir la ubicación exacta.
            </p>
          </div>

          <div className="locationActions">
            <a href={mapsUrl} className="button secondary" target="_blank" rel="noreferrer">
              Cómo llegar
            </a>

            <a
              href={createWhatsAppLink(
                'Hola, vi la página de Artesanías Lau y quiero consultar si están atendiendo.'
              )}
              className="button whatsapp"
              target="_blank"
              rel="noreferrer"
            >
              Consultar si está abierto
            </a>
          </div>
        </div>

        <div className="sectionTools sectionToolsBottom">
          <a className="backButton" href="#categorias">
            Ver categorías
          </a>

          <a className="backButton" href="#inicio">
            Volver arriba
          </a>
        </div>
      </section>

      <footer className="footer">
        <div>
          <strong>ARTESANÍAS LAU</strong>
          <span>Regional Andino</span>
        </div>

        <p>
          Catálogo online de productos artesanales, textiles, mates y artículos
          regionales seleccionados en Salta Capital.
        </p>

        <div className="footerLinks">
          <a href="#inicio">Inicio</a>
          <a href="#destacados">Destacados</a>
          <a href="#categorias">Categorías</a>
          <a href="#sobre">Sobre</a>
          <a href="#envios">Entregas</a>
          <a href="#ubicacion">Ubicación</a>
        </div>
      </footer>

      <a
        className="floatingWhatsApp"
        href={createWhatsAppLink(
          'Hola, vi la página de Artesanías Lau y quiero hacer una consulta.'
        )}
        target="_blank"
        rel="noreferrer"
      >
        WhatsApp
      </a>
    </main>
  )
}

export default App