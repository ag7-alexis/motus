import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  Avatar,
  AvatarGroup,
  useBreakpointValue,
  IconProps,
  Icon,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Alert,
  AlertIcon, Center, VStack, StackDivider
} from '@chakra-ui/react';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { StorageService } from "../services/storage.service";
import MainLayout from '../src/layouts/MainLayout/MainLayout';
import GamePlayer from '../components/GamePlayer';

const avatars = [
  {
    name: 'Ryan Florence',
    url: 'https://bit.ly/ryan-florence',
  },
  {
    name: 'Segun Adebayo',
    url: 'https://bit.ly/sage-adebayo',
  },
  {
    name: 'Kent Dodds',
    url: 'https://bit.ly/kent-c-dodds',
  },
  {
    name: 'Prosper Otemuyiwa',
    url: 'https://bit.ly/prosper-baba',
  },
  {
    name: 'Christian Nwamba',
    url: 'https://bit.ly/code-beast',
  },
];
export const Blur = (props) => {
  return (
    <Icon
      width={useBreakpointValue({ base: '100%', md: '40vw', lg: '30vw' })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};
const Home = () => {
  const router = useRouter();
  const [gameNumber, setGameNumber] = useState(-1);
  const [gameState, setGameState] = useState();

  useEffect(() => {
    // Delay until router is ready (JS fully loaded on page)
    if (!router || !router.isReady) {
      return;
    }

    const routerGameNumber = Number.parseInt(router.query.gameNumber);
    const storageGameNumber = StorageService.getLastPlayedGame();
    const gameNumberInUse = routerGameNumber || storageGameNumber;

    setGameState(StorageService.getGameState(gameNumberInUse));
    setGameNumber(gameNumberInUse);
  }, [router]);

  if (gameNumber == -1) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Box position={'relative'}>
        <Container
          as={SimpleGrid}
          maxW={'7xl'}
          columns={{ base: 1, md: 1 }}
          spacing={{ base: 10, lg: 32 }}
          py={{ base: 10, sm: 20, lg: 32 }}
          style={{ paddingTop: 60, gridGap: 'unset' }}
        >
          <Stack spacing={{ base: 5, md: 20 }}>
            <Heading
              lineHeight={1.1}
              fontSize={{ base: '2xl', sm: '2xl', md: '3xl', lg: '4xl' }}
              style={{ marginBottom: '50px' }}
            >
              Joue gratuitement à ton jeu de {' '}
              <Text
                as={'span'}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text">
                motus
              </Text>{' '}
              préféré.
            </Heading>
          </Stack>
          <Stack
            bg={'gray.50'}
            rounded={'xl'}
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ base: 8 }}
            maxW={{ lg: 'lg' }}
            style={{
              zIndex: '999',
              position: 'relative',
              background: '#fff6fe3b',
              maxWidth: 'unset'
            }}
          >
            <GamePlayer gameNumber={gameNumber} initialState={gameState}></GamePlayer>
          </Stack>
        </Container>
        <Blur
          position={'absolute'}
          top={-10}
          left={-10}
          style={{ filter: 'blur(70px)', zIndex: 10 }}

        />
      </Box>
    </>
  );
};
export default Home;
Home.getLayout = function getLayout(Home) {
  return <MainLayout>{Home}</MainLayout>;
};
