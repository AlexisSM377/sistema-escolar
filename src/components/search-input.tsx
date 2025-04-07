import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useState } from "react";

interface SearchInputProps {
    placeholder?: string;
    onSearch: (value: string) => void; // Callback para enviar el término de búsqueda
}

export default function SearchInput({ placeholder = "Buscar...", onSearch }: SearchInputProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);
        onSearch(value); // Llamar al callback con el nuevo valor
    };

    return (
        <div className="flex items-center gap-2">
            <SearchIcon className="h-4 w-4 text-muted-foreground" />
            <Input
                type="text"
                placeholder={placeholder}
                value={searchTerm}
                onChange={handleInputChange}
                className="h-9 w-[250px]"
            />
        </div>
    );
}