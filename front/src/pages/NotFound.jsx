import Button from "../components/Button";

export default function NotFound() {
    return (
        <div className="flex items-center justify-center min-h-screen px-4">
            <div className="text-center px-6 py-24 sm:py-32 lg:px-8">
                <p className="text-5xl font-semibold text-indigo-400 sm:text-7xl">404</p>

                <h1 className="mt-4 text-base tracking-tight text-balance text-white ">
                    Página no encontrada
                </h1>

                <p className="mt-6 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
                    Lo sentimos, no pudimos encontrar la página que estás buscando.
                </p>

                <div className="mt-10 flex items-center justify-between">
                    <div className="w-48">
                        <Button variant="primary">
                            Volver al inicio
                        </Button>
                    </div>
                    <a
                        href="#"
                        className="text-sm font-semibold text-white hover:text-indigo-300 transition"
                    >
                        Contactar soporte <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
