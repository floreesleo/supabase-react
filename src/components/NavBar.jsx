import { Navbar, Container, NavDropdown, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
// import { useUser } from "@supabase/auth-helpers-react";

export default function NavBar() {
  // const user = useUser();

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
        {/* <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <Link to="/perfil">{user.email}</Link>
          </Navbar.Text>
        </Navbar.Collapse> */}
      </Container>
    </Navbar>
  );
}
