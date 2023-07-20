import { Container, Card, Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { supabase } from "./../supabase/client";
//= import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  //= const navigate = useNavigate();

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resultado = await supabase.auth.signInWithOtp({
        email,
      });

      setMessage("Revice su bandeja para futuras instrucciones");

      console.log(resultado);
    } catch (error) {
      setError("Error al enviar correo de confirmación");
      console.error(error);
    }
  };

  // useEffect(() => {
  //   if (supabase.auth.getSession()) {
  //     navigate("/");
  //   }
  // }, [navigate]);

  return (
    <>
      <Container
        className="d-flex align-items-center justify-content-center"
        style={{ minHeight: "100vh" }}
      >
        <div className="w-100" style={{ maxWidth: "400px" }}>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Inicio de sesión</h2>
              {message && <Alert variant="success">{message}</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    required
                    name="email"
                    placeholder="example@example.com"
                    onChange={(ev) => setEmail(ev.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Button className="w-100 mt-2" type="submit">
                    Enviar
                  </Button>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </>
  );
}
