import { useEffect, useState } from "react";
import { Dialog, Stack, Tooltip, darken, Box } from "@mui/material";
import { MaterialReactTable } from 'material-react-table';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from '@mui/icons-material/Refresh';
import { IconButton } from "@mui/material";

//contexto
import { useUsuarioContext } from './UsuarioProvider.jsx'

//formularios
import FormInsert from "./FormInsert.jsx";
import FormUpdate from "./FormUpdate.jsx";
import FormDelete from "./FormDelete.jsx";
import FormDetails from "./FormDetails.jsx";

const UsuariosColumnas = [
    { 
        accessorKey: "id", 
        header: "ID", 
        size: 30 },
    { 
        accessorKey: "first_name", 
        header: "First Name", 
        size: 30 },
    { 
        accessorKey: "last_name", 
        header: "Last Name", 
        size: 30 },
    { 
        accessorKey: "avatar", 
        header: "Avatar", 
        size: 150 },
];

const UsuarioTable = () => {
    const [f_inser, insertState] = useState(false);
    const [f_actu, actuState] = useState(false);
    const [f_borr, borrarState] = useState(false);
    const [f_deta, detalState] = useState(false);
    const {
        usuarios,
        loadingTable,
        usuario_select,
        refresh_users,
    } = useUsuarioContext();
    return (
        <Box>
          <Box>
            <MaterialReactTable
              //Definir datos y columnas
              columns={UsuariosColumnas}
              data={usuarios}
              state={{ isLoading: loadingTable }}
              initialState={{ density: "compact", showGlobalFilter: true }}
              enableColumnActions={false}
              enableStickyHeader
              enableStickyFooter
              //Elegir solo un renglón
              enableRowSelection
              enableMultiRowSelection={false}
              //Borrar mensaje de selección de renglones
              positionToolbarAlertBanner="none"
              /*SE ACTUALIZA priceSel CUANDO CLICKEO UN CHECKBOX*/
              muiSelectCheckboxProps={({ row }) => ({
                onClick: (event) => {
                  usuario_select(row.original);
                  console.log(row.original);
                }
              })}
              renderTopToolbarCustomActions={({ table }) => (
                <>
                  {/* ------- BARRA DE ACCIONES ------ */}
                  <Stack direction="row" sx={{ m: 1 }}>
                    <Box>
                      {/* ============ BOTÓN AGREGAR ============ */}
                      <Tooltip title="Agregar">
                        <IconButton onClick={() => insertState(true)}>
                          <AddCircleIcon />
                        </IconButton>
                      </Tooltip>
                      {/* ============ BOTÓN EDITAR ============ */}
                      <Tooltip title="Editar">
                        <IconButton onClick={() => actuState(true)}>
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      {/* ============ BOTÓN ELIMINAR ============ */}
                      <Tooltip title="Eliminar">
                        <IconButton onClick={() => borrarState(true)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                      {/* ============ BOTÓN DETALLES ============ */}
                      <Tooltip title="Detalles">
                        <IconButton onClick={() => detalState(true)}>
                          <InfoIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Stack>
                  {/* ------- BARRA DE ACCIONES FIN ------ */}
                </>
              )}
            />
          </Box>
          {/* M O D A L E S */}
          <FormInsert show={f_inser} formState={insertState} />
          <FormUpdate show={f_actu} formState={actuState} />
          <FormDelete show={f_borr} formState={borrarState} />
          <FormDetails show={f_deta} formState={detalState} />
        </Box>
      );
    };

export default UsuarioTable;