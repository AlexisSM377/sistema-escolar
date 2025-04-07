import ListOfUsers from "./list-of-members"
import CreateUser from "./create-user"

export function UsersTable() {


    return (
        <div className="space-y-4">
            <div className="flex items-center justify-end">

                <CreateUser />
            </div>

            <ListOfUsers />
        </div>
    )
}

