import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initUser } from "../../src/store/features/user/userSlice";

export default function Dashboard() {
    const dispatch = useDispatch();
    useEffect(() => {
        const user = {
            username: "Michel",
            score: 1560,
        };
        dispatch(initUser(user));
    }, []);
    const user = useSelector((state) => state.user[0]);
    return (
        <div>
            <main>
                <h1>TODO page de navigation</h1>
                <p>LANCER UN MOTUS</p>
                <p>ACCESS LEADERBOARD</p>
                <p>
                    SI PAS DE COMPTE LIEN PAGE DE CONNECTION ??? VRAI CONNECION OU JUSTE UN USERNAME ??? PB LEADERBOARD
                    ?
                </p>

                {user ? <>{user.username} est connecté mec</> : <>TODO FORM POUR CREER SON USER</>}
            </main>
        </div>
    );
}
