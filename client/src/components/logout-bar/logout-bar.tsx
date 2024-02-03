import { Button, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { logout } from '../../store/async-reducers/logout';

export function LogoutBar(): JSX.Element {
  const { email } = useAppSelector(state => state.authSlice.user);
  const dispatch = useAppDispatch();

  const handleLogoutClick = () => {
    dispatch(logout());
  };
  return (
    <>
      <Typography variant="h6" component="p">{email}</Typography>
      <Button onClick={ handleLogoutClick } color="inherit">logout</Button>
    </>
  );
}
