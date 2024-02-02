import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useAppDispatch } from '../../hooks/store';
import { login } from '../../store/async-reducers/login';
import { Credentials } from '../../models/user';
import { validate } from '../../utils/auth';

type LoginModalProps = {
  onLoginClose: () => void;
}

export function LoginModal({
  onLoginClose
}: LoginModalProps) {

  const dispatch = useAppDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Credentials>();

  const handleModalClose = () => onLoginClose();
  const onSubmit: SubmitHandler<Credentials> = async (data) => {
    try {
      await dispatch(login(data)).unwrap();
      reset();
      handleModalClose();
    } catch (error) {
      console.log('unwrap error happened');
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
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Enter your email and password here to get authenticated
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="email"
          label="Email"
          type="text"
          variant="standard"
          {...register('email', {required: true, pattern: /\w@\w/i})}
          error={!!errors.email}
          helperText={validate(errors, 'email')}
        />
        <TextField
          margin="dense"
          id="password"
          label="Password"
          type="password"
          variant="standard"
          fullWidth
          {...register('password', {required: true, minLength: 3})}
          error={!!errors.password}
          helperText={validate(errors, 'password')}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleModalClose}>Cancel</Button>
        <Button type="submit">Login</Button>
      </DialogActions>
    </Dialog>
  );
}
