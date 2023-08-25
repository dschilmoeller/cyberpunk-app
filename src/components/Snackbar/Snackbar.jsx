import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';

function TransitionUp(props) {
    return <Slide {...props} direction="up" />;
}

const [showSnackbar, setShowSnackbar] = React.useState(false);
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

<Snackbar
    TransitionComponent={TransitionUp}
    autoHideDuration={2000}
    open={showSnackbar}
    onClose={() => setShowSnackbar(false)}
    anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
>
    <Alert onClose={() => setShowSnackbar(false)} severity="warning" sx={{ width: '100%' }}>
    Transaction canceled due to lack of funds!
    </Alert>
</Snackbar >


// Transaction canceled due to lack of funds!