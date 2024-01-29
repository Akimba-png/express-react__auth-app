import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type SignupModaProps = {
  onSignupClose: () => void;
}

export function SignupModal({
  onSignupClose
}: SignupModaProps) {
  const handleModalClose = () => onSignupClose();

  return (
    <Dialog
      open={true}
      onClose={ handleModalClose }
      PaperProps={{
        component: 'form',
      }}
      maxWidth="xs"
    >
      <DialogTitle>Sign up</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Fill out your user data to sign up
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="name"
          name="name"
          label="User name"
          type="text"
          variant="standard"
        />
        <TextField
          required
          margin="dense"
          id="email"
          name="email"
          label="Email"
          type="email"
          variant="standard"
          fullWidth
        />
        <TextField
          required
          margin="dense"
          id="password"
          name="password"
          label="Password"
          type="email"
          variant="standard"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleModalClose}>Cancel</Button>
        <Button type="submit">Sign up</Button>
      </DialogActions>
    </Dialog>
  );
}
