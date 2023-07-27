//| Importar librerias, dependencias, hooks y  modulos a utilizar
import { useEffect, useState } from "react";
import {
  Container,
  Form,
  Card,
  Alert,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import NavBar from "./NavBar";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";

//| URL donde está almacenada la base de datos de storage, módulo donde se suben archivos
//+ https://tiwxplqzmqvtbkrrsflm.supabase.co/storage/v1/object/public/files/dbeae5c4-9d27-4a25-b285-44f91f674d60/462b59de-bbb6-415c-ac88-c9b922c8b2aa
const CDNURL =
  "https://tiwxplqzmqvtbkrrsflm.supabase.co/storage/v1/object/public/files/";

export default function Home() {
  const user = useUser(); //| user hace uso del método useUser() de la dependencia helper de supabase
  const supabaseClient = useSupabaseClient(); //| supabaseClient es la libreria encargada de

  const navigate = useNavigate(); //| navigate utiliza el método useNavigate, que relacionado a los Route del archivo App.jsx se navega por los módulos que se le pasen como parametros.

  console.log("Estado de la sesión", user);

  const [email, setEmail] = useState(""); //| Constantes por las que se recibe el email que introdusca el usuario

  const [message, setMessage] = useState(""); //| Constantes por las que se se le envia un mensaje de confirmación al usuario que decea iniciar sesión
  const [error, setError] = useState(""); //| Constantes por las que se le envia un mensaje de error, si es que ocurre alguno

  const [images, setImages] = useState([]); //| Constantes para asignar los archivos que se van a asignar

  useEffect(() => {
    //| Si existe el usuario, obtiene todos los archivos de la base de datos
    if (user) {
      getFiles();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //| Obtiene las constantes data y error del método signInWithOtp, la cual este método es por el cual el usuario inicia sesión por medio de confirmacion de correo electronico
      const { data, error } = await supabaseClient.auth.signInWithOtp({
        email,
      });

      if (error) {
        setError("Error al comunicarse con supabase.");
        console.error(error);
      } else {
        setMessage("Revice su bandeja para futuras instrucciones");
      }

      console.log(data);
    } catch (error) {
      setError("Error al enviar correo de confirmación");
      console.log(error);
    }
  };

  //| Funcion para obtener todos los archivos del storage donde se pasa como parametro el id del usuario iniciado
  async function getFiles() {
    const { data, error } = await supabaseClient.storage
      .from("files")
      .list(user?.id + "/", {
        limit: 100,
        offset: 0,
        sortBy: { column: "name", order: "asc" },
      });

    if (data !== null) {
      setImages(data);
    } else {
      console.error(error);
    }
  }

  //| Funcion para subir archivo al storage de supabase
  async function uploadFile(ev) {
    let file = ev.target.files[0];

    const { data, error } = await supabaseClient.storage
      .from("files")
      .upload(user.id + "/" + uuidv4(), file); //? uuid genera un id de tipo string aleatorio para el nombre del archivo

    if (data) {
      getFiles();
    } else {
      console.error(error);
    }
  }

  //| Funcion para borrar un archivo con respecto al id del usuario
  async function deleteImage(imageName) {
    const { error } = await supabaseClient.storage
      .from("files")
      .remove([user.id + "/" + imageName]);

    if (error) {
      alert(error);
    } else {
      getFiles();
    }
  }

  //| Funcion para cerrar sesión
  async function handleLogOut() {
    try {
      const { error } = await supabaseClient.auth.signOut();
      navigate("/");
      if (error) {
        console.error(error);
      }
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      {/* Si la constante user es nula, se va al formulario */}
      {user === null ? (
        <>
          <Card>
            <Card.Body>
              <h2 className="text-center mb-4">Inicio de sesión</h2>
              {/* Imprime los mensajes o los errores del estado de la sesión */}
              {message && <Alert variant="success">{message}</Alert>}
              {error && <Alert variant="danger">{error}</Alert>}
              <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                  <Form.Label>
                    Ingresa tu Email para obtener el Link mácico
                  </Form.Label>
                  <Form.Control
                    type="email"
                    required
                    name="email"
                    placeholder="example@example.com"
                    onChange={(ev) => setEmail(ev.target.value)}
                  />
                </Form.Group>
                <Form.Group>
                  <Button
                    className="w-100 mt-2"
                    type="submit"
                    variant="primary"
                  >
                    Confirmar email
                  </Button>
                </Form.Group>
              </Form>
              <Button
                variant="danger"
                className="mt-2"
                onClick={() => handleLogOut()}
              >
                Cerrar sesión
              </Button>
            </Card.Body>
          </Card>
        </>
      ) : (
        //| Si el usuario no es nulo, entra al Home
        <>
          <NavBar />
          <Container align="center" className="container-sm mt-4">
            <Form.Group className="mb-3" controlId="formFile">
              <Form.Control
                type="file"
                accept="image/png, image/jpge, image/jpg, .doc, .docx, .txt"
                onChange={(ev) => uploadFile(ev)}
              />
            </Form.Group>
            <h3>Tus archivos</h3>
            <Row xs={1} md={3} className="g-4">
              {/* Mapea a las imagenes y las muestra por medio de una Card */}
              {images.map((image) => {
                return (
                  //| Obtiene como llave el url, el id del usuario y el nombre de la imagen
                  <Col key={CDNURL + user.id + "/" + image.name}>
                    <Card>
                      <Card.Img
                        variant="top"
                        src={CDNURL + user.id + "/" + image.name}
                      />
                      <Card.Body>
                        {/* Boton para borrar la imagen */}
                        <Button
                          variant="danger"
                          onClick={() => deleteImage(image.name)}
                        >
                          Borrar archivo
                        </Button>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          </Container>
        </>
      )}
    </>
  );
}
