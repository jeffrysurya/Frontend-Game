import AppBar from "@mui/material/AppBar";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Paper,
  Box,
  Grid,
  Typography,
  Toolbar,
  IconButton,
  Link,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { getLocalStorage, fetchLogout } from "../../features/Auth/action";

function Landing(props) {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const accessToken = getLocalStorage("userLogin");
    if (accessToken) {
      setIsLogin(true);
    }
  }, [dispatch, isLogin]);

  const handleLogout = () => {
    dispatch(fetchLogout());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/dashboard" sx={{ color: "#fff" }}>
              Final Chap
            </Link>
          </Typography>

          {isLogin ? (
            <>
              <Button color="inherit" onClick={handleLogout}>
                <Link variant="body2" sx={{ color: "#fff" }}>
                  Log Out
                </Link>
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit">
                <Link href="/auth/login" variant="body2" sx={{ color: "#fff" }}>
                  Login
                </Link>
              </Button>
              <Button color="inherit">
                <Link
                  href="/auth/register"
                  variant="body2"
                  sx={{ color: "#fff" }}
                >
                  Register
                </Link>
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography component="h1" variant="h5">
              Welcome To
            </Typography>
            <Box component="form" noValidate sx={{ mt: 1 }}>
              <Typography
                component="h1"
                variant="h2"
                sx={{ textAlign: "center" }}
              >
                Final Chapter
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Landing;
