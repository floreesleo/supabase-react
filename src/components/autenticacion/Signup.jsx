import { useEffect, useState } from "react";
import { supabase } from "./../../supabase/client";
import { Link, useNavigate } from "react-router-dom";

export default function Signup() {
  const [emailRef, setEmailRef] = useState("");
  const [passwordRef, setPasswordRef] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const session = supabase.auth.getSession();
    console.log(session);
  }, []);

  const handleSubmit = async () => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: emailRef,
        password: passwordRef,
      });

      if (error) throw error;
      console.log(data);

      navigate("/");

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
          placeholder="********"
          onChange={(ev) => setPasswordRef(ev.target.value)}
        />
        <button type="submit">Registrarse</button>
      </form>

      <div>
        ¿Ya tienes una cuenta?, <Link to="/login">Inicia sesión</Link>
      </div>
    </>
  );
}
