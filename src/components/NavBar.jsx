import { Navbar, Container, NavDropdown, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
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
              <NavDropdown.Item as={Link} to="/admin">
                Administrador
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/tasks">
                Tareas
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/files">
                Archivos
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/contactos">
                Contactos
              </NavDropdown.Item>
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
