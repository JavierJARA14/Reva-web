import { Dialog, DialogContent, DialogTitle, DialogActions, Button, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";

import { useUsuarioContext } from "./UsuarioProvider.jsx";

const FormDetails = ({ show, formState }) => {
    const commonTextFieldProps = {
        fullWidth: true,
        margin: "dense",
        disabled: true
    }

    const { usuario } = useUsuarioContext();

    if (!usuario.id) {
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
                Información del registro:
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
                sx={{ display: 'flex', justifyContent: 'center' }}
            >
                {/* ============ BOTÓN CERRAR ============ */}
                <LoadingButton
                    color="primary"
                    variant="contained"
                    onClick={() => formState(false)}
                >
                    <span>CERRAR</span>
                </LoadingButton>
            </DialogActions>

        </Dialog>
    );
}

export default FormDetails;