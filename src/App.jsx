import { useRef, useState } from 'react'
import './App.css'
import { categories } from './data/categories'
import { products } from './data/products'

const WHATSAPP_NUMBER = '5490000000000'

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
      <section className="hero">
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
          <button className="backButton" onClick={scrollToCategories}>
            Ver categorías
          </button>
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
            </div>
          </>
        )}
      </section>
    </main>
  )
}

export default App