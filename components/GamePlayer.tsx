import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useEffect, useMemo } from "react";
import useWordle from "../hooks/useWordle";
import { StorageService } from "../services/storage.service";
import { ROW_SIZE } from "../static-data/words";
import { WordleState } from "../types/WordleState";
import { AlertComponent } from "./alert.component";
import KeyboardComponent from "./Keyboard";
import TileRowComponent from "./tile-row.component";
import styles from './GamePlayer.module.scss';

interface GameComponentProps {
  gameNumber: number;
  initialState?: WordleState;
}

const GameComponent: FC<GameComponentProps> = ({
  gameNumber,
  initialState
}) => {
  const ROWS = useMemo<Array<number>>(() => new Array(ROW_SIZE).fill(0), []);
  const {
    isReady,
    isGameOver,
    alert,
    invalidIndex,
    currentRow,
    guesses,
    summary,
    submitHandler,
    letterHandler,
    deleteHandler
  } = useWordle({ gameNumber, initialState });
  const router = useRouter();
  useEffect(() => {
    StorageService.saveLastPlayedGame(gameNumber);
  }, [gameNumber]);

  if (!isReady) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.gameContainer}>
      <div className="top">
        <AlertComponent alert={alert} />

        {isGameOver && (
          <div className="game-over">
            <Button rightIcon={<ArrowForwardIcon />} colorScheme='teal' variant='outline'>
              <a href={`/?gameNumber=${gameNumber + 1}`}>Prochain mot</a>

            </Button>
          </div>
        )}

        <div className="tile-container">
          {ROWS.map((_, index) => (
            <TileRowComponent
              key={`row-${index}`}
              invalid={invalidIndex === index}
              isCurrent={isGameOver ? false : currentRow === index}
              guess={guesses[index]}
            />
          ))}
        </div>
      </div>

      <div className="bottom">
        <KeyboardComponent
          submitHandler={submitHandler}
          letterHandler={letterHandler}
          deleteHandler={deleteHandler}
          summary={summary}
        />
      </div>
    </div>
  );
};

export default GameComponent;
