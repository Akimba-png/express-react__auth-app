import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

type LoginModaProps = {
  onLoginClose: () => void;
}

export function LoginModal({
  onLoginClose
}: LoginModaProps) {
  const handleModalClose = () => onLoginClose();

  return (
    <Dialog
      open={true}
      onClose={ handleModalClose }
      PaperProps={{
        component: 'form',
      }}
      maxWidth="xs"
    >
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter your email and password here to get authenticated
        </DialogContentText>
        <TextField
          autoFocus
          required
          margin="dense"
          id="email"
          name="email"
          label="Email"
          type="email"
          variant="standard"
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
        <Button type="submit">Subscribe</Button>
      </DialogActions>
    </Dialog>
  );
}
