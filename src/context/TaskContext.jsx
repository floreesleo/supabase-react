//| Importar librerias, dependencias, hooks y  modulos a utilizar
import { createContext, useContext, useState } from "react";
import { supabase } from "./../supabase/client";

export const TaskContext = createContext();

//| La constante useTask es la proveedora de las funciones, constantes a utilizar en el proyecto
// eslint-disable-next-line react-refresh/only-export-components
export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context)
    throw new Error("useTask debe estar dentro de un TaskContextProvider");
  return context;
};

//| Componente más grande que contiene a los componentes pequeños
// eslint-disable-next-line react/prop-types
export const TaskContextProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [adding, setAdding] = useState([]);

  const [loading, setLoading] = useState(false);

  const getTasks = async (done = false) => {
    //? Se pone done en false, ya que se le va a indicar si quiero que esté en true o false

    setLoading(true);
    const user = supabase.auth.getUser();

    //? from es la equvalencia a select * from
    const { error, data } = await supabase
      .from("tasks")
      .select()
      .eq("userId", user.id) //? eq("userId", user.id) hace la validacion de que solo obtenga las tareas de la tabla taks donde el user.id es el usuario logueado
      .eq("done", done)
      .order("id", { ascending: true });

    if (error) throw error;

    setTasks(data); //? data es el arreglo, osea los datos de las tareas (id, nombre, id del usuario)

    setLoading(false);
  };

  //| Funcion para crear una tarea
  const createTask = async (taskName) => {
    setAdding(true);
    try {
      const user = supabase.auth.getUser(); //| Se obtienen los datos del usuario que haya iniciado sesión
      const { error, data } = await supabase.from("tasks").insert({
        //| inserta a la tabla tasks los valores name y el id del usuario
        name: taskName,
        userId: user.id,
      });

      if (error) throw error;

      setTasks([...tasks, ...data]); //? ...tasks es como decir trae una copia de los datos anteriores
    } catch (error) {
      console.error(error);
    } finally {
      setAdding(false);
    }
  };

  //| Funcion para borrar tarea
  const deleteTask = async (id) => {
    //| Recibe como paremetro el id de la tarea que se decea borrar
    const user = supabase.auth.getUser(); //| Se obtienen los datos del usuario que haya iniciado sesión

    const { error } = await supabase
      .from("tasks")
      .delete()
      .eq("userId", user.id)
      .eq("id", id);

    if (error) throw error;

    setTasks(tasks.filter((task) => task.id !== id)); //| Se filtra la tabla tasks por medio del id de la tarea a borrar
  };

  //| Funcion para actualizar tarea
  const updateTask = async (id, updateFields) => {
    const user = supabase.auth.getUser();

    // eslint-disable-next-line no-unused-vars
    const { error, data } = await supabase
      .from("tasks")
      .update(updateFields)
      .eq("userId", user.id)
      .eq("id", id);

    if (error) throw error;

    setTasks(tasks.filter((task) => task.id !== id)); //| Se filtra la tabla tasks por medio del id de la tarea a actualizar
  };

  //| Funcion para obtener a todos los usuarios de la tabla administrador
  const getUsers = async () => {
    setLoading(true);

    const { error, data } = await supabase
      .from("administrador") //| Obtiene a todos los campos de la tabla administrador
      .select()
      .order("id", { ascending: true });

    if (error) throw error;

    setUsers(data); //| Carga a setUsers la data de la seleccion de la tabla

    setLoading(false);
  };

  //| Funcion para crear un usuario nuevo
  const createUser = async (nombre, usuario) => {
    setAdding(true);
    try {
      const { error, data } = await supabase //| Consulta a base de datos para crear nuevo usuario
        .from("administrador")
        .insert({ name: nombre, user: usuario });

      if (error) throw error;

      setUsers([...users, ...data]);
    } catch (error) {
      console.error(error);
    } finally {
      setAdding(false);
    }
  };

  //| Funcion para borrar usuario pasandole por parametro el id
  const deleteUser = async (id) => {
    // eslint-disable-next-line no-unused-vars
    const { error, data } = await supabase
      .from("administrador")
      .delete()
      .eq("id", id);

    if (error) throw error;

    setUsers(users.filter((user) => user.id !== id));
  };

  //| Funcion para actualizar al usuario, pasandole como parametros el id y el campo que se decea acualizar
  const updateUser = async (id, updateFields) => {
    // eslint-disable-next-line no-unused-vars
    const { error, data } = await supabase
      .from("administrador")
      .update(updateFields)
      .eq("id", id);

    if (error) throw error;

    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <TaskContext.Provider
      value={{
        // Value exporta todas las constantes, funciones y variables que se decean proveer a los demas componentes
        tasks,
        getTasks,
        createTask,
        adding,
        loading,
        deleteTask,
        updateTask,
        users,
        getUsers,
        createUser,
        deleteUser,
        updateUser,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
