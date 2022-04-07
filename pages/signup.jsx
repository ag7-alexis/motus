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
import { InputControl, SubmitButton } from 'formik-chakra-ui';
import { useState } from 'react'
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext'
import MainLayout from '../src/layouts/MainLayout/MainLayout';
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
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { FcGoogle } from 'react-icons/fc';
import * as Yup from "yup";
const LoginForm = () => {
  const router = useRouter()
  const { user, signup, loginWithGoogle, auth } = useAuth();

  const [authError, setAuthError] = useState(null);
  function validateEmail(value) {
    let error
    if (!value) {
      error = 'L\'email est requis'
    }
    return error
  }
  function validatePassword(value) {
    let error
    if (!value) {
      error = 'Le mot de passe est requis'
    }
    return error
  }
  const ErrorMessage = (message) => {
    return <Alert status='error'><AlertIcon /> {message}</Alert>
  }
  const onClickLoginWithGoogle = async () => {
    loginWithGoogle().then(
      () => {
        router.push('/')
      }
    ).catch(
      error => {
        alert(error)
      })
  }
  return <Formik
    initialValues={{ email: '' }}
    onSubmit={async (values, actions) => {
      try {
        await signup(values.email, values.password)
        router.push('/dashboard')
      } catch (err) {
        setAuthError(err.code);
        console.log(err)
      }
    }}
  >
    {(props) => (

      <Form>
        <Stack spacing={4}>
          <Field name='email' validate={validateEmail}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.email && form.touched.email}>
                <FormLabel htmlFor='email'>Email</FormLabel>
                <Input {...field} id='email' placeholder='bossdumotus@gmail.com' />
                <FormErrorMessage>{form.errors.email}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
          <Field name='password' validate={validatePassword}>
            {({ field, form }) => (
              <FormControl isInvalid={form.errors.password && form.touched.password}>
                <FormLabel htmlFor='password'>Mot de passe</FormLabel>
                <Input {...field} type="password" id='password' placeholder='Mot de passe' />
                <FormErrorMessage>{form.errors.password}</FormErrorMessage>
              </FormControl>
            )}
          </Field>
        </Stack>
        <VStack
          divider={<StackDivider borderColor='gray.200' />}
          spacing={4}
          align='stretch'
        >
          <Button
            type="submit"
            fontFamily={'heading'}
            mt={8}
            w={'full'}
            bgGradient="linear(to-r, red.400,pink.400)"
            color={'white'}
            _hover={{
              bgGradient: 'linear(to-r, red.400,pink.400)',
              boxShadow: 'xl',
            }}
            isLoading={props.isSubmitting}>
            Inscription
          </Button>
          <Button w={'full'} variant={'outline'} leftIcon={<FcGoogle />} onClick={onClickLoginWithGoogle}>
            <Center>
              <Text>S'inscrire avec Google</Text>
            </Center>
          </Button>
        </VStack>
        <Box mt={4}>
          {authError !== 'null' && authError == 'auth/email-already-in-use' ? <Alert status='error'>
            <AlertIcon />
            Email déjà utilisée par un autre compte
          </Alert> : authError == 'auth/invalid-email' ? <Alert status='error'>
            <AlertIcon />
            Email invalide
          </Alert> : authError == 'auth/user-not-found' ? <Alert status='error'>
            <AlertIcon />
            Utilisateur non-trouvé
          </Alert> : authError == 'auth/login-google-failed' ? <Alert status='error'><AlertIcon />
            Connexion avec Google echouée</Alert> : ''}


        </Box>

      </Form>
    )}
  </Formik>
}

export default function Signup() {
  return (
    <Box position={'relative'}>
      <Container
        as={SimpleGrid}
        maxW={'7xl'}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}>
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}>
            Inscrit toi sur ton futur jeu de {' '}
            <Text
              as={'span'}
              bgGradient="linear(to-r, red.400,pink.400)"
              bgClip="text">
              morpion
            </Text>{' '}
            préféré.
          </Heading>
          <Stack direction={'row'} spacing={4} align={'center'}>
            <AvatarGroup>
              {avatars.map((avatar) => (
                <Avatar
                  key={avatar.name}
                  name={avatar.name}
                  src={avatar.url}
                  size={useBreakpointValue({ base: 'md', md: 'lg' })}
                  position={'relative'}
                  zIndex={2}
                  _before={{
                    content: '""',
                    width: 'full',
                    height: 'full',
                    rounded: 'full',
                    transform: 'scale(1.125)',
                    bgGradient: 'linear(to-bl, red.400,pink.400)',
                    position: 'absolute',
                    zIndex: -1,
                    top: 0,
                    left: 0,
                  }}
                />
              ))}
            </AvatarGroup>
            <Text fontFamily={'heading'} fontSize={{ base: '4xl', md: '6xl' }}>
              +
            </Text>
            <Flex
              align={'center'}
              justify={'center'}
              fontFamily={'heading'}
              fontSize={{ base: 'sm', md: 'lg' }}
              bg={'gray.800'}
              color={'white'}
              rounded={'full'}
              width={useBreakpointValue({ base: '44px', md: '60px' })}
              height={useBreakpointValue({ base: '44px', md: '60px' })}
              position={'relative'}
              _before={{
                content: '""',
                width: 'full',
                height: 'full',
                rounded: 'full',
                transform: 'scale(1.125)',
                bgGradient: 'linear(to-bl, orange.400,yellow.400)',
                position: 'absolute',
                zIndex: -1,
                top: 0,
                left: 0,
              }}>
              YOU
            </Flex>
          </Stack>
        </Stack>
        <Stack
          bg={'gray.50'}
          rounded={'xl'}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: 'lg' }}>
          <Stack spacing={4}>
            <Heading
              color={'gray.800'}
              lineHeight={1.1}
              fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
              Inscription
              <Text
                as={'span'}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text">.
              </Text>
            </Heading>
          </Stack>
          <LoginForm></LoginForm>
        </Stack>
      </Container>
      <Blur
        position={'absolute'}
        top={-10}
        left={-10}
        style={{ filter: 'blur(70px)' }}
      />
    </Box>
  );
}
Signup.getLayout = function getLayout(Signup) {
  return <MainLayout>{Signup}</MainLayout>;
};
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