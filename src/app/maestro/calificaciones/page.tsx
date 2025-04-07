import SeleccionarGrupo from "./components/seleccionar-grupo";

export default function page() {
    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold">
                Registro de Calificaciones
            </h1>
            <p className="text-lg text-muted-foreground">
                Registra y modifica las calificaciones de tus alumnos.
            </p>

            <SeleccionarGrupo />

        </div>
    )
}