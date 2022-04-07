import { initializeApp, firebase } from 'firebase/app';
import { getFirestore, collection, getDocs, orderBy, query, limit, firestore, where } from 'firebase/firestore';
import React, { useEffect, useState } from "react";
import styles from '../../styles/Home.module.css';
import { app } from "../../config/firebase.js";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
} from '@chakra-ui/react'
import { isEmpty } from '@firebase/util';
import { useAuth } from '../../context/AuthContext';
  
export default function Leaderboard() {

   // const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);
    //const db = firebase.firestore();
    const [infoUser, setUsersList] = useState([]);
    const [infPosition, setPosition] = useState([]);
    let [infCurrentPosition, setCurrentPosition] = useState([]);
    const { user } = useAuth();
    

    async function getLeaderBoard() {
      //  const db = firebase.firestore();
        // const citiesCol = collection(db, 'leaderboard').orderBy("score", "desc").limit(10);
        const params = collection(db, 'leaderboard');
        const q = query( params, orderBy("score", "desc"), limit(10));
        const qSnapshot = await getDocs(q);
        const qList = qSnapshot.docs.map(doc => doc.data());
       return qList;
    }

    async function getLeaderBoardCurrentUser() {
        //  const db = firebase.firestore();
          // const citiesCol = collection(db, 'leaderboard').orderBy("score", "desc").limit(10);
          const params = collection(db, 'leaderboard');
          const q = query( params, where("name", "==", user.email));
          const qSnapshot = await getDocs(q);
          const qList = qSnapshot.docs.map(doc => doc.data());
         return qList;
    }

    
    useEffect( ()=>{
        (async() => {const users = await getLeaderBoard();
            setUsersList(users);  setPosition(1); } ) ();
     },[]);

     useEffect( ()=>{
        (async() => {const users = await getLeaderBoardCurrentUser();
            setCurrentPosition(users) } ) ();
     },[]);

     if (isEmpty(infCurrentPosition)){
        infCurrentPosition = [{
            name: "X",
            score: 0,
        }]; 
    }

    return (
        <div className={styles.container}>
            {infoUser && <main>
                
                {/* <h1>Leaderboard</h1>
                <h1>TODO classement</h1>
                <p>AFFICHER X premier + AFFICHER CLASSEMENT DU CURRENT USER</p>
                <p>AUTORIZE L ACCESS UNIQUEMENT AU JOUEUR AUTH</p> */}

                <Table  variant='simple' className={styles.table} mt={8}>
                        <Thead>
                            <Tr color='gray.50' bg="gray.50">
                                <Th>name</Th>
                                <Th>score</Th>
                                <Th>Position</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {infoUser.map((user) => {
                                return <Tr key={user.name}>
                                    <Td>{user.name}</Td>
                                    <Td>{user.score}</Td>
                                    <Td>{infPosition++}</Td>
                                </Tr>
                            })}
                        </Tbody>
                        <Tfoot>
                        <Tr color='gray.50' bg="gray.50">
                                <Th>My score</Th>
                                <Th></Th>
                                <Th></Th>
                            </Tr>
                            <Tr>
                                <Th>{infCurrentPosition[0].name}</Th>
                                <Th>{infCurrentPosition[0].score}</Th>
                                <Th></Th>
                            </Tr>
                        </Tfoot>
                    </Table>

            </main>}
        </div>
    );
}
