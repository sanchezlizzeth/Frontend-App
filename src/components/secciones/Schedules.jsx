const Schedules = () => {
    return (
        <section id="#cursos" className="py-20 bg-white">
            <div className="container">
                <h2 className="text-3xl font-bold mb-8">Nuestros Horarios</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Aquí irían tus tarjetas de cursos */}
                    <div className="p-6 shadow-lg rounded-xl bg-orange-50">Curso de React</div>
                    <div className="p-6 shadow-lg rounded-xl bg-orange-50">Curso de Tailwind</div>
                    <div className="p-6 shadow-lg rounded-xl bg-orange-50">Curso de Framer Motion</div>
                </div>
            </div>
        </section>
    );
};

export default Schedules;
