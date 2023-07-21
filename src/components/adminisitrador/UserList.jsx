import { useTask } from "../../context/TaskContext";
import UserCard from "./UserCard";
import { useEffect } from "react";

export default function Admin() {
  const { users, getUsers, loading } = useTask();

  useEffect(() => {
    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function renderUsers() {
    if (loading) {
      return <p>Cargando...</p>;
    } else if (users.length === 0) {
      return <p>Sin usuarios encontrados</p>;
    } else {
      return (
        <div>
          {users.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      );
    }
  }

  return (
    <>
      <div>{renderUsers()}</div>
    </>
  );
}
