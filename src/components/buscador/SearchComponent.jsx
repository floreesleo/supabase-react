/* eslint-disable no-unused-vars */
import NavBar from "./../NavBar";
import { useState, useEffect } from "react";
import { Table, Container, Form } from "react-bootstrap";

export default function SearchComponent() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const URL = "https://jsonplaceholder.typicode.com/users";

  const showData = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setUsers(data);
  };

  const searcher = (e) => {
    setSearch(e.target.value);
  };

  const results = !search
    ? users
    : users.filter((dato) =>
        dato.name.toLowerCase().includes(search.toLocaleLowerCase())
      );

  useEffect(() => {
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
