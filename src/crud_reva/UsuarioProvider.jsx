import React, { createContext, useContext, useEffect, useState } from "react";

//Importar APIS
import { getListUser, getUser, insertUser, updateUser, deleteUser } from "../apis/apis.js";

//Se crea el contexto
const UserContext = createContext();

//Se crea la función para utilizar el contexto
export const useUsuarioContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("usePrice debe de estar dentro de un provider");
  }

  return context;
}

//Se define "el contenido" del contexto
export function UsuarioProvider({ children }) {
  const [usuarios, setUsuarios] = useState([]);
  const [usuario, setUsuario] = useState([]);
//   const [priceSel, setPriceSel] = useState({ _id: null, precios: [], roles: [], promociones: [], negocios: [] });
  const [loadingTable, setLoadingTable] = useState(false);

  {/* ============ CARGA LOS DATOS LA PRIMERA VEZ QUE SE CARGA EL CONTEXTO ============ */ }
  useEffect(() => {
    refresh_users();
  }, []);

  {/* ============ TABLA ALLPRICES ============ */ }
  const refresh_users = async () => {
    setLoadingTable(true);
    try {
      const res = await getListUser();
      setUsuarios(res.data);
    } catch (error) {
      console.error(`Error al obtener usuarios`, error);
    }
    setLoadingTable(false);
  };

  const usuario_select = async (values) => {
    setLoadingTable(s => true);
    //Si values es null entonces si inicializa un objeto vacío
    //Para que no "truenen" las tablas de los subdocumentos
    if (!values) {
      setUsuario({});
    } else {
      setUsuario(values);
    }
    setLoadingTable(s => false);
  };

  //Refresh
  const refresh_user = async () => {
    setLoadingTable(s => true);
    //Si el id es nullo entonces se inicializa un objeto vacío
    //como en actualizar_price
    if (usuario._id) {
      try {
        const res = await getUser(usuario.id);
        setUsuario(res.data);
      } catch (error) {
        console.error(`ERROR al refrescar usuario`, error);
      }
    }
    setLoadingTable(s => false);
  };

  const insertar_Usuario = async (campos) => {
    setLoadingTable(s => true);
    const respuesta = await insertUser(campos);
    setLoadingTable(s => false);
  }

  const actualizar_Usuario = async (values) => {
    setLoadingTable(s => true);
    await updateUser(usuario.id, values);
    setLoadingTable(s => false);
  }

  const borrar_Usuario = async (id) => {
    setLoadingTable(s => true);
    await deleteUser(id);
    setLoadingTable(s => false);
  }
  return (
    <UserContext.Provider value={{
        usuarios,
        usuario,
        setUsuarios,
        setUsuario,
        refresh_users,
        usuario_select,
        refresh_user,
        insertar_Usuario,
        actualizar_Usuario,
        borrar_Usuario
    }}>
      {children}
    </UserContext.Provider>
  );
}
