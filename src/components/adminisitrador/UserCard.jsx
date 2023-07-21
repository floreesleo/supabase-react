/* eslint-disable react/prop-types */
import { useTask } from "./../../context/TaskContext";

export default function UseCard({ user }) {
  const { deleteUser, updateUser } = useTask();

  const handleDelete = () => {
    deleteUser(user.id);
  };

  const handleUpdate = () => {
    updateUser(user.id);
  };

  return (
    <div>
      <h2>{user.name}</h2>
      <h2>{user.user}</h2>
      <div>
        <button onClick={() => handleDelete()}>Eliminar</button>
        <button onClick={() => handleUpdate()}>Editar</button>
      </div>
    </div>
  );
}
