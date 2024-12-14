import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";

import { useFormik } from "formik"; //Para crear el formulario
import * as Yup from "yup"; //Para validar los campos

import { useState, useEffect } from "react";

import { useUsuarioContext } from './UsuarioProvider';

const FormUpdate = ({ show, formState }) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
    const [Loading, setLoading] = useState(false);

    //Utilizar funciones y variables del contexto
    const { actualizar_Usuario, usuario, refresh_users } = useUsuarioContext();

    const formik = useFormik({
            initialValues: {
                first_name: "",
                last_name: "",
                avatar: "",
            },
            validationSchema: Yup.object({
                first_name: Yup.string().required("Campo requerido"),
                last_name: Yup.string().required("Campo requerido"),
                avatar: Yup.string().required("Campo requerido"),
            }),
        /* ============ CÓDIGO OnSubmit SI TODO ESTÁ BIEN ============ */
        onSubmit: async (values) => {
            setLoading(true);

            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);

            try {
                {/* ============ MÉTODO QUE LLAMA A LA API (ESTÁ EN EL CONTEXTO) ============ */ }
                await actualizar_Usuario(values);
                setMensajeExitoAlert("Usuario actualizado correctamente");
                refresh_users();
            } catch (e) {
                setMensajeExitoAlert(null);
                setMensajeErrorAlert("No se pudo actualizar el usuario");
            }
            setLoading(false);
        },
    });

    const commonTextFieldProps = {
        onChange: formik.handleChange,
        onBlur: formik.handleBlur,
        fullWidth: true,
        margin: "dense",
        disabled: !!mensajeExitoAlert,
    };

    {/* ============ ACTUALIZA LOS CAMPOS CADA QUE priceSel se modifica ============ */ }
    useEffect(() => {
        formik.setFieldValue("first_name", usuario.first_name);
        formik.setFieldValue("last_name", usuario.last_name);
        formik.setFieldValue("avatar", usuario.avatar);
    }, [usuario]);

    {/* ============ TIENE priceSel un _id válido? ============ */ }
    if (!usuario.id && !!!mensajeExitoAlert) {
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
        <Dialog
            open={show}
            onClose={() => formState(false)}
            fullWidth
        >
            {/* ============ HANDLE SUBMIT (click en boton actualizar)============ */}
            <form onSubmit={formik.handleSubmit}>

                <DialogTitle>
                    <Typography variant="h6" component="div">
                        <strong>Actualizar Usuario</strong>
                    </Typography>
                </DialogTitle>
                <DialogContent
                    sx={{ display: 'flex', flexDirection: 'column' }}
                    dividers
                >
                    {/* ============ TEXTFIELDS PARA EL FORMULARIO ============ */}
                    <TextField
                        id="first_name"
                        label="first_name"
                        value={formik.values.first_name}
                        {...commonTextFieldProps}
                        error={formik.touched.first_name && Boolean(formik.errors.first_name)}
                        helperText={formik.touched.first_name && formik.errors.first_name}
                    />

                    <TextField
                        id="last_name"
                        label="last_name"
                        value={formik.values.last_name}
                        {...commonTextFieldProps}
                        error={formik.touched.last_name && Boolean(formik.errors.last_name)}
                        helperText={formik.touched.last_name && formik.errors.last_name}
                    />

                    <TextField
                        id="avatar"
                        label="avatar"
                        value={formik.values.avatar}
                        {...commonTextFieldProps}
                        error={formik.touched.avatar && Boolean(formik.errors.avatar)}
                        helperText={formik.touched.avatar && formik.errors.avatar}
                    />
                </DialogContent>
                {/* FIC: Aqui van las acciones del usuario como son las alertas o botones */}
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
                        type="submit" //Como es de tipo submit no requiere un onClick, se va a handleSubmit
                        disabled={!!mensajeExitoAlert}
                        loading={Loading}
                    >

                        <span>Actualizar</span>
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
}
export default FormUpdate;