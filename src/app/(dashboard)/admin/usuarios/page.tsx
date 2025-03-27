import { UsersTable } from "@/components/users-table";
import UsuarioForm from "./components/createForm";

export default function page() {
    return (
        <div>
            <h1>Usuarios</h1>
            <UsuarioForm />
        </div>
    )
}