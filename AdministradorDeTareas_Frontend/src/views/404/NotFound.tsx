import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <>
      <h1 className="fonr-black text-center text-4xl text-white">
        Pagina no encontrada
      </h1>
      <p className="mt-10 text-center text-white">
        Tal vez quieras volver a{" "}
        <Link className="text-amber-600" to={"/"}>
          {" "}
          Proyectos
        </Link>
      </p>
    </>
  );
}
