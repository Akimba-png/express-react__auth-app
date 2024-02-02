import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { signup } from '../../store/async-reducers/signup';
import { RegData } from '../../models/user';
import { useAppDispatch } from '../../hooks/store';
import { validate } from '../../utils/auth';


type SignupModalProps = {
  onSignupClose: () => void;
}

export function SignupModal({
  onSignupClose
}: SignupModalProps) {

  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegData>();

  const handleModalClose = () => onSignupClose();
  const onSubmit: SubmitHandler<RegData> = async (data) => {
    try {
      await dispatch(signup(data)).unwrap();
      reset();
      handleModalClose();
    } catch (error) {
      () => console.log('unwrap error happend');
    }
  };

  return (
    <Dialog
      open={true}
      onSubmit={ handleSubmit(onSubmit) }
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
          margin="dense"
          id="name"
          label="User name"
          type="text"
          variant="standard"
          { ...register('name', {required: true, minLength: 3})}
          error={!!errors.name}
          helperText={validate(errors, 'name')}
        />
        <TextField
          margin="dense"
          id="email"
          label="Email"
          type="text"
          variant="standard"
          fullWidth
          { ...register('email', {required: true, pattern: /\w+@\w/i})}
          error={!!errors.email}
          helperText={validate(errors, 'email')}
        />
        <TextField
          margin="dense"
          id="password"
          label="Password"
          type="text"
          variant="standard"
          fullWidth
          { ...register('password', {required: true, minLength: 3})}
          error={!!errors.name}
          helperText={validate(errors, 'password')}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleModalClose}>Cancel</Button>
        <Button type="submit">Sign up</Button>
      </DialogActions>
    </Dialog>
  );
}
