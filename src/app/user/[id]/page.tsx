import DeleteUserButton from "./deleteUser";
import GetUserButton from "./getUser";
import ListUserButton from "./listUser";
import UpdateUserButton from "./updateUser";

export default function UserPage({params}: {params: {id : string}}) {

    return (
        <div>
            <h1>User Page</h1>
            <GetUserButton></GetUserButton>
            <DeleteUserButton></DeleteUserButton>
            <ListUserButton></ListUserButton>
            <UpdateUserButton></UpdateUserButton>
        </div>
    )
}