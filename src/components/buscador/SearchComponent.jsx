/* eslint-disable no-unused-vars */
import NavBar from "./../NavBar";
import { useState, useEffect } from "react";
import { Table, Container, Form } from "react-bootstrap";

export default function SearchComponent() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  //| URL de donde está almacenada la api fake de usuarios
  const URL = "https://jsonplaceholder.typicode.com/users";

  //| Funcion para mostrar los datos de JSON de la URL
  const showData = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setUsers(data);
  };

  //| Funcion con la que se buscará al usuario por medio del evento e, que se almacenará en la constante setSearch
  const searcher = (e) => {
    setSearch(e.target.value);
  };

  // Constante donde se filtra el resultado de la busqueda, pasando a minusculas lo escrito en el buscador
  const results = !search
    ? users
    : users.filter((dato) =>
        dato.name.toLowerCase().includes(search.toLocaleLowerCase())
      );

  useEffect(() => {
    // Al iniciar, recargar o mostrar el componente se mostrarán los datos de los usuario de la URL
    showData();
  }, []);

  return (
    <>
      <NavBar />
      <Container className="mt-3">
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>
            <strong>Buscador de usuarios por nombre</strong>
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Buscador"
            value={search}
            onChange={searcher}
          />
        </Form.Group>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Usuario</th>
            </tr>
          </thead>
          <tbody>
            {results.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.username}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
