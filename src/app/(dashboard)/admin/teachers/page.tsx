import { TableSearch } from "@/components/table-search";



export default function page() {
    return (
        <div className="p-4 flex-1 m-4 mt-0">
            <div className="flex justify-between items-center">
                <h1 className="hidden md:block text-2xl font-semibold">
                    Lista de profesores
                </h1>
                <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                    <button className="btn btn-primary">Agregar profesor</button>
                    <button className="btn btn-primary">Importar</button>
                </div>
            </div>
            <div>

                <TableSearch />
            </div>
        </div>
    )
}
