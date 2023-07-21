import NavBar from "./../NavBar";
import UserForm from "./UserForm";
import UserList from "./UserList";

export default function UserHome() {
  return (
    <>
      <NavBar />
      <UserForm />
      <header>
        <h3>Gestor de usuarios</h3>
      </header>
      <UserList />
    </>
  );
}
