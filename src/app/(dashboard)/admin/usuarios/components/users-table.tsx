
import { Input } from "@/components/ui/input"
import ListOfUsers from "./list-of-members"
import { SearchIcon } from "lucide-react"
import CreateUser from "./create-user"

export function UsersTable() {


    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <SearchIcon className="h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Buscar usuarios..." className="h-9 w-[250px]" />
                </div>
                <CreateUser />
            </div>

            <ListOfUsers />
        </div>
    )
}

