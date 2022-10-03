import React, { useState, Fragment, useEffect } from "react";
import HeaderGame from "../../components/game/Header";
import Table from "../../components/game/Table";
// import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import AppBar from "@mui/material/AppBar";
import { Avatar, Button, Typography, Toolbar, Link } from "@mui/material";
import { useDispatch } from "react-redux";
import { getLocalStorage, fetchLogout } from "../../features/Auth/action";

const GamePlay = () => {
  const dispatch = useDispatch();

  const [playerScore, setPlayer] = useState(0);
  const [opponentScore, setOpponent] = useState(0);
  const [round, setRound] = useState(0);
  const [match, setMatch] = useState(0);
  const [isLogin, setIsLogin] = useState(0);
  const auth = useSelector((state) => state.auth);
  const router = useRouter();

  useEffect(() => {
    const accessToken = getLocalStorage("userLogin");
    if (!accessToken) {
      window.open("http://localhost:3000/", "_self");
    } else {
      setIsLogin(true);
    }
  }, [dispatch]);
  const handleLogout = () => {
    dispatch(fetchLogout());
  };

  return (
    <Fragment>
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
      <main className="relative min-h-screen bg-slate-600 ">
        <div className="container w-full mx-auto">
          <div className="grid grid-cols-12 grid-rows-4 gap-4 ">
            <div className="col-start-2 col-end-12 md:col-start-4 md:col-end-10 border-2 rounded-md p-4 m-4">
              <HeaderGame
                playerScore={playerScore}
                opponentScore={opponentScore}
                round={round}
                match={match}
              />
            </div>
            <div className="col-start-2 col-end-12 md:col-start-4 md:col-end-10 row-span-3 flex items-center justify-center">
              <Table
                setPlayer={setPlayer}
                playerScore={playerScore}
                setOpponent={setOpponent}
                opponentScore={opponentScore}
                setRound={setRound}
                round={round}
                setMatch={setMatch}
                match={match}
              />
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
};

export default GamePlay;
