import CreateProfesor from "./components/create/create-profesor";
import ListOfProfesorGrupo from "./components/list-profesor-grupo";

export default function page() {
    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold">Asigancion de profesores a grupos</h1>
            <p className="dark:text-gray-300 ">
                Administra la asignación de profesores a los grupos disponibles en la institución.
            </p>
            <div className="flex items-center justify-end">
                <CreateProfesor />
            </div>
            <ListOfProfesorGrupo />
        </div>
    )
}