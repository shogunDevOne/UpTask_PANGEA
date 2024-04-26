import { Link, Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Logo2 from "@/components/Logo2";
import NavMenu from "@/components/NavMenu";

export default function AppLayout() {
  return (
    <>
      <header className="bg-gray-800 py-5">
        <div className=" max-w-screen-2xl mx-auto flex flex-col lg:flex-row lg:mb-4 lg:mt-4 justify-between items-center">
          <div className="w-80 ml-5 ">
            <Link to={"/"}>
              <Logo2 />
            </Link>
          </div>

          <NavMenu />
        </div>
      </header>

      <section className="max-w-screen-2xl mx-auto mt-10 p-5 ">
        <Outlet />
      </section>

      <footer className="py-5">
        <p className="text-center">
          Todos los derechos reservados - PANGEA - {new Date().getFullYear()}
        </p>
      </footer>

      <ToastContainer pauseOnHover={false} pauseOnFocusLoss={false} />
    </>
  );
}
