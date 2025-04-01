import { notFound } from "next/navigation";
import { getUsuarioById } from "../../actions";
import EditUserForm from "../../components/edit-user-form";

interface PageProps {
    params: {
        id: string;
    };
}

export default async function EditUserPage(props: PageProps) {
    const { id } = props.params;

    const { usuario, error } = await getUsuarioById(id);

    if (error || !usuario) {
        notFound();
    }

    return (
        <div className="space-y-6 ">
            <div>
                <h1 className="text-2xl font-bold">Editar Usuario</h1>
                <p className="dark:text-gray-300">
                    Modifica los datos del usuario.
                </p>
            </div>
            <div className="border rounded-lg p-4 shadow-md">

                <EditUserForm usuario={usuario} />
            </div>
        </div>
    );
}