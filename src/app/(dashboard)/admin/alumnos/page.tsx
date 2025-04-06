import CreateEstudiante from "./components/create/create-estudiante";
import ListOfAlumnosGrupo from "./components/list-alumnos-grupo";

export default function page() {
    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold">
                Asignación de estudiantes a grupos
            </h1>
            <p className="dark:text-gray-300 ">
                Administra la asignación de estudiantes a los grupos disponibles en la institución.
            </p>
            <div className="flex items-center justify-end">
                <CreateEstudiante />
            </div>
            <ListOfAlumnosGrupo />
        </div>
    )
}