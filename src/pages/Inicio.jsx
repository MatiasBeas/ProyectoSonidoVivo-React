import { Link } from 'react-router-dom';

const categorias = [
    { nombre: "Guitarras", descripcion: "Eléctricas y acústicas para todo nivel.", imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9a9-2oGfSXR8yF1kc5dGH_ksXMEBuINK2H8W6OSMlRw&s=10" },
    { nombre: "Baterías", descripcion: "Acústicas y electrónicas.", imagen: "https://dojiw2m9tvv09.cloudfront.net/52889/product/X_mk7vkrt5cd-0010824.jpg?29&t=1786019916" },
    { nombre: "Amplificadores", descripcion: "Para práctica y ensayos en vivo.", imagen: "https://cdn.awsli.com.br/2500x2500/1920/1920376/produto/257890120d169e072e2.jpg" },
];

function Inicio() {
    return (
        <>
            <section className="hero py-5 px-4 px-lg-5">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 text-white">
                            <h1 className="display-4 fw-bold mb-3">Instrumentos<br />Musicales y Accesorios</h1>
                            <p className="lead mb-4" style={{ color: "rgba(255,255,255,0.8)" }}>
                                Todo lo que necesitas para iniciar en el mundo de la música.
                            </p>
                            <Link to="/productos" className="btn btn-accent btn-lg rounded-pill px-4">Ver Productos</Link>
                        </div>
                        <div className="col-lg-6 mt-4 mt-lg-0">
                            <img src="https://images.unsplash.com/photo-1535587566541-97121a128dc5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Z3VpdGFyfGVufDB8MHwwfHx8MA%3D%3D"
                                className="img-fluid rounded-4 shadow-lg" alt="Instrumentos Musicales"
                            />
                        </div>
                    </div>
                </div>
            </section>

            <section className="py-5">
                <div className="container">
                    <h6 className="text-center fw-bold" style={{ color: "var(--acento)", letterSpacing: "1px" }}>CATÁLOGO</h6>
                    <h2 className="text-center mb-5 fw-bold">Nuestros Productos</h2>
                    <div className="row g-4">

                        {categorias.map((categoria, index) => (
                            <div className="col-md-4" key={categoria.nombre}>
                                <div className="card h-100 shadow-sm">
                                    <img src={categoria.imagen} className="card-img-top" alt={categoria.nombre} />
                                    <div className="card-body text-center">
                                        <h5 className="card-title">{categoria.nombre}</h5>
                                        <p className="card-text">{categoria.descripcion}</p>
                                        <Link to="/productos" className="btn btn-accent">Ver más</Link>
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </section>
        </>
    );
}

export default Inicio;