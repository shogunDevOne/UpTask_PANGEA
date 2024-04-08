import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import ProjectForm from "@/components/projects/ProjectForm";
import { ProjectFormData } from "@/types/index";

export default function EditProjectForm() {
  const initialValues: ProjectFormData = {
    projectName: "",
    clientName: "",
    description: "",
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialValues });

  const handleForm = () => {};

  return (
    <>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl font-black">Editar Proyecto</h1>
        <p className="text-2xl font-light text-gray-500 mt-5">
          Completa el siguiente formulario para editar el proyecto
        </p>

        <nav className="my-5">
          <Link
            className="bg-gray-800 hover:bg-gray-950 px-10 py-3 text-white text-xl font-bold cursor-pointer
                    transition-colors"
            to="/"
          >
            Volver a Proyectos
          </Link>
        </nav>

        <form
          className="mt-10 bg-white shadow-lg p-10 rounded-lg"
          onSubmit={handleSubmit(handleForm)}
          noValidate
        >
          <ProjectForm register={register} errors={errors} />

          <input
            type="submit"
            value="Guardar Cambios"
            className=" bg-gray-800 hover:bg-gray-950 w-full p-3 text-white uppercase font-bold
                                        cursor-pointer transition-colors "
          />
        </form>
      </div>
    </>
  );
}
