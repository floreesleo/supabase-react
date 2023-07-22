import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "./../../supabase/client";

export default function Login() {
  const [emailRef, setEmailRef] = useState("");
  const [passwordRef, setPasswordRef] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      // eslint-disable-next-line no-unused-vars
      const { data, error } = await supabase.auth.signInWithPassword({
        email: emailRef,
        password: passwordRef,
      });

      navigate("/");

      setEmailRef("");
      setPasswordRef("");

      if (error) throw error;

      setEmailRef("");
      setPasswordRef("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="example@example.com"
          onChange={(ev) => setEmailRef(ev.target.value)}
        />
        <input
          type="password"
          placeholder="*******"
          onChange={(ev) => setPasswordRef(ev.target.value)}
        />
        <button type="submit">Iniciar sesión</button>
        <div>
          <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
        </div>
      </form>
      <div>
        ¿No tienes una cuenta?, <Link to="/signup">Registrate</Link>
      </div>
    </>
  );
}
