import { Button } from '@mui/material';

type LoginBarProps = {
  onSignupClick: () => void,
  onLoginClick: () => void,
};

export function LoginBar({
  onLoginClick,
  onSignupClick,
}: LoginBarProps): JSX.Element {
  return (
    <>
      <Button onClick={ onSignupClick } color="inherit">
        Signup
      </Button>
      <Button onClick={ onLoginClick } color="inherit">
        Login
      </Button>
    </>
  );
}
