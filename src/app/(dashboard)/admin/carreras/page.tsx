'use client'
import CreateCarrera from "./components/create/create-carrera";
import ListOfCarreras from "./components/list-of-carreras";
import { useState } from "react";
import SearchInput from "@/components/search-input";

export default function page() {
    const [searchTerm, setSearchTerm] = useState("")
    return (
        <div className="space-y-4 w-full overflow-y-auto px-3">
            <h1 className="text-3xl font-bold">Gestión de Carreras</h1>
            <p className="dark:text-gray-300 ">Administra las carreras disponibles en la institución.</p>
            <div className="flex items-center justify-between">
                <SearchInput placeholder="Buscar carreras..." onSearch={(value) => setSearchTerm(value)} />
                <CreateCarrera />

            </div>
            <ListOfCarreras searchTerm={searchTerm} />

        </div>
    )
}