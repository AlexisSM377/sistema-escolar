import { UsersTable } from "./components/users-table";

export default function page() {
    return (
        <div className="space-y-4">
            <h1 className="text-3xl font-bold">Gestión de usuarios</h1>
            <p className="text-gray-300 ">Administra maestros y alumnos del sistema.</p>
            <UsersTable />

        </div>
    )
}