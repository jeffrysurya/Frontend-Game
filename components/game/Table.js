import React, { useState, useEffect } from "react";
// import useHistory from 'react-router-dom';
import styled from "styled-components";
import Pick from "./Pick";
import axios from "axios";
import { getLocalStorage } from "../../features/Auth/action";

// import { getAuth } from 'firebase/auth'
// import { doc, updateDoc, getDoc } from 'firebase/firestore';
// import { db } from '../../../firebase-config';

const TableStyled = styled.div`
  display: grid;
  grid-template-columns: 130px 130px;
  justify-content: center;
  justify-items: center;
  grid-gap: 30px 50px;
  margin: 2em 0;
  position: relative;
  & div:nth-of-type(3) {
    grid-column: span 2;
  }
  .in-game {
    text-align: center;
    text-transform: uppercase;
    font-size: 0.8em;
    font-weight: 700;
    letter-spacing: 1px;
  }
  .results {
    text-align: center;
    h2 {
      text-transform: uppercase;
      font-size: 40px;
      margin: 10px;
    }
  }
  .line {
    display: ${({ playing }) => (!playing ? "block" : "none")};
    height: 14px;
    background: rgba(0, 0, 0, 0.2);
    position: absolute;
    width: 200px;
    top: 58px;
    &:before {
      content: "";
      height: 14px;
      background: rgba(0, 0, 0, 0.2);
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      transform: rotate(60deg);
      transform-origin: left top;
    }

    &:after {
      content: "";
      height: 14px;
      background: rgba(0, 0, 0, 0.2);
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      transform: rotate(-60deg);
      transform-origin: right top;
    }
  }
  @media screen and (min-width: 1024px) {
    grid-template-columns: 300px 300px;
    ${({ playing, results }) =>
      playing && results && "grid-template-columns: 300px 110px 110px 300px;"}

    & div:nth-of-type(3) {
      ${({ playing, results }) =>
        playing && results && "grid-column: 2 / 4; grid-row: 1;"}
    }
    .line {
      width: 300px;
    }
    .results {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }

    .in-game {
      font-size: 1.2em;
      display: flex;
      flex-direction: column;
      > div {
        order: 2;
      }
      > p {
        order: 1;
        margin-bottom: 2em;
      }
    }
  }
`;
const elements = ["paper", "scissors", "rock"];

const Table = (props) => {
  const [results, setResults] = useState("");
  const [comPick, setComPick] = useState("default");
  const [playing, setPlaying] = useState(false);
  const [pick, setPick] = useState("");
  const [prevData, setPrevData] = useState([]);

  // const navigate = useHistory();

  const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
  };
  const launchComPick = () => {
    return new Promise((resolve, reject) => {
      let pick;
      const interval = setInterval(() => {
        pick = elements[getRandomInt(0, 3)];
        setComPick(pick);
      }, 75);
      setTimeout(() => {
        clearInterval(interval);
        resolve(pick);
      }, 2000);
    });
  };
  const onChoosePick = async (name) => {
    setPlaying(true);
    setPick(name);
    const comChoosePick = await launchComPick();
    const results = gameStart(name, comChoosePick);
    setResults(results);
    if (results === "win") {
      props.setPlayer((prev) => prev + 1);
    }
    if (results === "lose") {
      props.setOpponent((prev) => prev + 1);
    }
  };
  const gameStart = (pick, comPick) => {
    if (comPick === pick) {
      return "draw";
    }
    if (pick === "paper") {
      if (comPick === "scissors") {
        return "lose";
      }
      if (comPick === "rock") {
        return "win";
      }
    }
    if (pick === "scissors") {
      if (comPick === "paper") {
        return "win";
      }
      if (comPick === "rock") {
        return "lose";
      }
    }
    if (pick === "rock") {
      if (comPick === "paper") {
        return "lose";
      }
      if (comPick === "scissors") {
        return "win";
      }
    }
  };
  const handleTryAgain = () => {
    setPlaying(false);
    setResults("");
  };

  const handleNextMatch = () => {
    setPlaying(false);
    setResults("");

    props.setMatch((prev) => prev + 1);
    if (props.match % 3 == 0 && props.match != 0) {
      props.setRound((prev) => prev + 1);
    }
  };

  const handleEndgame = () => {
    setPlaying(false);
    setResults("");
    props.setMatch(0);
    props.setRound(0);
    props.setPlayer(0);
    props.setOpponent(0);
  };

  const endGame = async () => {
    try {
      const docRef = doc(db, "users", auth?.currentUser?.uid);
      const payload = {
        history: [
          ...prevData,
          {
            pick,
            comPick,
            results: props.score === 0 ? "lose" : "win",
            score: props.score,
            createdAt: new Date(),
          },
        ],
        totalScore:
          prevData.reduce((acc, cur) => acc + cur.score, 0) + props.score,
      };
      await updateDoc(docRef, payload);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const getUser = async () => {
    const userRef = doc(db, "users", auth?.currentUser?.uid);
    try {
      const user = await getDoc(userRef);
      if (user?.exists()) {
        setPrevData(user?.data()?.history);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const getToken = async (res,req) => {
  //     try {
  //         const response = await axios({
  //             method: 'post',
  //             url: 'https://test-deploy123122.herokuapp.com/v1/auth/login',
  //             data: {
  //                 email: "fake@example.com",
  //                 password: "password1",
  //             }
  //         })
  //         if (response.status === 200) {
  //             // console.log(response.data.tokens.access.token)
  //             return response.data.tokens.access.token
  //         }
  //     } catch (error) {
  //         return res.status(500).json({ error: error.message })

  //     }
  // }

  const postScore = async (res, req) => {
    try {
      const postresult =
        props.playerScore > props.opponentScore ? "win" : "lose";

      const token = getLocalStorage("userLogin");
      const response = await axios({
        method: "post",
        url: "https://test-deploy123122.herokuapp.com/v1/scores",
        data: {
          playerscore: props.playerScore,
          opponentscore: props.opponentScore,
          result: postresult,
        },
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      });

      if (response.status === 201) {
        handleEndgame();
      }
    } catch (error) {}
  };
  // useEffect(() => {
  //     getUser()
  // }, [])

  return (
    <TableStyled playing={playing} results={results !== ""}>
      <span className="line"></span>
      {!playing ? (
        <>
          <Pick name="paper" onClick={onChoosePick} />
          <Pick name="scissors" onClick={onChoosePick} />
          <Pick name="rock" onClick={onChoosePick} />
        </>
      ) : (
        <>
          <div className="in-game">
            <Pick
              playing={playing}
              name={pick}
              isShadowAnimated={results === "win"}
            />
            <p className="mt-2 text-white">You Picked</p>
          </div>
          <div className="in-game">
            <Pick
              playing={playing}
              name={comPick}
              isShadowAnimated={results === "lose"}
            />
            <p className="mt-2 text-white">The COM Picked</p>
          </div>
          <div className="results">
            {results && (
              <>
                <h2 className="text-white font-bold">YOU {results}</h2>
                {props.match % 3 == 0 && props.match != 0 ? (
                  <button
                    onClick={postScore}
                    className="py-5 px-7 md:mt-8 ml-2 md:ml-0 bg-green-400 hover:bg-green-500 text-center rounded-md transition-[0.5s]"
                  >
                    End Game
                  </button>
                ) : (
                  <button
                    className="bg-white rounded-md py-5 px-8"
                    onClick={handleNextMatch}
                  >
                    Next Match
                  </button>
                )}
                ,
              </>
            )}
          </div>
        </>
      )}
    </TableStyled>
  );
};

export default Table;
