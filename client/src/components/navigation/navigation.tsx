import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { Box, Container } from '@mui/material';
import { LoginModal } from './../login-modal/login-modal';
import { SignupModal } from './../signup-modal/signup-moda';
import { LoginBar } from '../login-bar/login-bar';
import { LogoutBar } from '../logout-bar/logout-bar';
import { useAppSelector } from '../../hooks/store';
import { AuthStatus } from '../../const';

export function Navigation(): JSX.Element {
  const { authStatus } = useAppSelector((state) => state.authSlice);
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [isSignupOpen, setIsSignupOpen] = useState<boolean>(false);

  const handleLoginOpen = () => {
    setIsLoginOpen(true);
  };

  const handleLoginClose = () => {
    setIsLoginOpen(false);
  };

  const handleSignupOpen = () => {
    setIsSignupOpen(true);
  };

  const handleSignupClose = () => {
    setIsSignupOpen(false);
  };

  return (
    <>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Typography variant="h6" component="h1" sx={{ flexGrow: 1 }}>
              My very cool auth app
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: 3,
              }}
            >
              {authStatus === AuthStatus.Auth ? (
                <LogoutBar />
              ) : (
                <LoginBar
                  onLoginClick={handleLoginOpen}
                  onSignupClick={handleSignupOpen}
                />
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {isLoginOpen && <LoginModal onLoginClose={handleLoginClose} />}
      {isSignupOpen && <SignupModal onSignupClose={handleSignupClose} />}
    </>
  );
}
