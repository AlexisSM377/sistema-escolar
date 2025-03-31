
import UsuarioForm from "./components/createForm";
import { UsersTable } from "./components/users-table";

export default function page() {
    return (
        <div>
            <h1>Usuarios</h1>
            <UsersTable />
            {/* <UsuarioForm /> */}
        </div>
    )
}