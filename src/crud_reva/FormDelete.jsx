import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";

import { useState } from "react";

import { useUsuarioContext } from "./UsuarioProvider.jsx";

const FormDelete = ({ show, formState }) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);

    const commonTextFieldProps = {
        fullWidth: true,
        margin: "dense",
        disabled: true
    }

    const { borrar_Usuario, usuario, usuario_select, refresh_users } = useUsuarioContext();

    /* ============ MÉTODO PARA ELIMINAR ============ */
    const eliminarUsuario = async (campos) => {
        setLoading(true);
        setMensajeErrorAlert(null);
        setMensajeExitoAlert(null);
        try {
            await borrar_Usuario(usuario.id);
            setMensajeExitoAlert("Usuario eliminado correctamente");
            refresh_users();
        } catch (error) {
            setMensajeExitoAlert(null);
            setMensajeErrorAlert("NO se pudo eliminar el usuario");
            console.error(`ERROR al ELIMINAR USUARIO`, error);
        }
        setLoading(false);
    }

    if (!usuario.id && !mensajeExitoAlert) {
        return (
            <Dialog open={show} onClose={() => formState(false)} fullWidth>

                <DialogTitle style={{ textAlign: 'center' }}>
                    NO has seleccionado un registro de la tabla!
                </DialogTitle>

                <DialogContent style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button variant="contained" color="primary" onClick={() => formState(false)}>
                        Cerrar
                    </Button>
                </DialogContent>

            </Dialog>
        );
    }

    return (
        <Dialog open={show} onClose={() => formState(false)} fullWidth>

            <DialogTitle style={{ textAlign: 'center' }}>
                ¿Estás seguro que deseas eliminar el siguiente registro?
            </DialogTitle>

            <DialogContent style={{ display: 'flex', flexDirection: 'column' }} dividers>
                {/* IdInstitutoOK */}
                <TextField
                    label={"id"}
                    value={usuario.id}
                    {...commonTextFieldProps}
                />

                {/* IdListaOK */}
                <TextField
                    label={"first_name"}
                    value={usuario.first_name}
                    {...commonTextFieldProps}
                />

                {/* IdListaBK */}
                <TextField
                    label={"last_name"}
                    value={usuario.last_name}
                    {...commonTextFieldProps}
                />

                {/* DesLista */}
                <TextField
                    label={"avatar"}
                    value={usuario.avatar}
                    {...commonTextFieldProps}
                />
            </DialogContent>

            <DialogActions
                sx={{ display: 'flex', flexDirection: 'row' }}
            >
                <Box m="auto">
                    {mensajeErrorAlert && (
                        <Alert severity="error">
                            <b>¡ERROR!</b> ─ {mensajeErrorAlert}
                        </Alert>
                    )}
                    {mensajeExitoAlert && (
                        <Alert severity="success">
                            <b>¡ÉXITO!</b> ─ {mensajeExitoAlert}
                        </Alert>
                    )}
                </Box>

                {/* ============ BOTÓN CERRAR ============ */}
                <LoadingButton
                    color="secondary"
                    loadingPosition="start"
                    startIcon={<CloseIcon />}
                    variant="outlined"
                    onClick={() => {
                        formState(false);
                        setMensajeErrorAlert(null);
                        setMensajeExitoAlert(null);
                    }}
                >
                    <span>CERRAR</span>
                </LoadingButton>

                {/* ============ BOTÓN ACTUALIZAR ============ */}
                <LoadingButton
                    color="primary"
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="contained"
                    onClick={() => eliminarUsuario()}
                    disabled={!!mensajeExitoAlert}
                    loading={Loading}
                >

                    <span>Eliminar</span>
                </LoadingButton>
            </DialogActions>

        </Dialog>
    );
}
export default FormDelete;
