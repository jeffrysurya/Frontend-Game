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
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import Image from "next/image";

import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch } from "react-redux";
import {
  getLocalStorage,
  fetchLogout,
  fetchScore,
} from "../../features/Auth/action";
import HeaderGame from "../../components/game/Header";
import Table from "../../components/game/Table";
import roomImage from "../../assets/images/room-image.jpg";

function Dashboard(props) {
  const dispatch = useDispatch();
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const accessToken = getLocalStorage("userLogin");
    if (!accessToken) {
      window.open("http://localhost:3000/", "_self");
    } else {
      setIsLogin(true);
    }
    dispatch(fetchScore());
  }, [dispatch]);

  useEffect(() => {}, [dispatch]);

  const handleLogout = () => {
    dispatch(fetchLogout());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link href="/" sx={{ color: "#fff" }}>
              Final Chap
            </Link>
          </Typography>

          {isLogin ? (
            <>
              <Link
                variant="body2"
                href="/videos/"
                sx={{ color: "#fff", mr: 2 }}
              >
                VIDEO
              </Link>
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
      <Grid container component="main" sx={{ height: "100vh", p: 4 }}>
        <Card sx={{ display: "flex", height: "20vh", mx: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                Gunting Batu Kertas
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                2022
              </Typography>
            </CardContent>
            <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
              <Button>
                <Link href="/dashboard/game">Join</Link>
              </Button>
            </Box>
          </Box>
          <Image src={roomImage} width="200" />
        </Card>
        <Card sx={{ display: "flex", height: "20vh", mx: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                Comming Soon
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                2022
              </Typography>
            </CardContent>
            <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
              <Button> Join</Button>
            </Box>
          </Box>
          <Image src={roomImage} width="200" />
        </Card>
        <Card sx={{ display: "flex", height: "20vh", mx: 2 }}>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography component="div" variant="h5">
                Comming Soon
              </Typography>
              <Typography
                variant="subtitle1"
                color="text.secondary"
                component="div"
              >
                2022
              </Typography>
            </CardContent>
            <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
              <Button> Join</Button>
            </Box>
          </Box>
          <Image src={roomImage} width="200" />
        </Card>
      </Grid>
    </Box>
  );
}

export default Dashboard;
