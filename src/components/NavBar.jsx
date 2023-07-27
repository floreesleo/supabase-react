//| Importar librerias, dependencias, hooks y  modulos a utilizar
import { Navbar, Container, NavDropdown, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    //| Barra de navegación util para todo el proyecto
    <Navbar
      expand="lg"
      className="bg-body-tertiary"
      bg="dark"
      data-bs-theme="dark"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          Home
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Modulos" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="/usuarios">
                Usuarios
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/tareas">
                Tareas
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/contactos">
                Contactos
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/buscador">
                Buscador
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item as={Link} to="/perfil">
                Perfil
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
