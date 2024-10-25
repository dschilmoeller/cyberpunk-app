import React from 'react';
import { Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

// Required Elements:
// const [pageAlert, setPageAlert] = useState({ open: false, message: '', severity: '' })

// <SnackbarComponent
// open={pageAlert.open}
// message={pageAlert.message}
// severity={pageAlert.severity}
// onClose={() => setPageAlert({ open: false, message: '', severity: '' })}
// />

// setPageAlert({ open: true, message: 'Error!', severity: 'error'})}

// required props for daughter components:
// setPageAlert={setPageAlert}

const Alert = React.forwardRef((props, ref) => <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />);

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

const SnackbarComponent = ({ open, message, severity, onClose }) => {
    return (
        <Snackbar
            TransitionComponent={TransitionUp}
            autoHideDuration={2000}
            open={open}
            onClose={onClose}
            anchorOrigin={{ horizontal: 'center', vertical: 'top' }}>
            <Alert
                onClose={onClose}
                severity={severity}>
                {message}
            </Alert>
        </Snackbar>
    )
}

export default SnackbarComponent