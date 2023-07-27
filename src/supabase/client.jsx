//| Importar la dependencia de supabase para conectarse la base de datos
import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  //| importar de forma segura la Url y la llave privada de supabase
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);
