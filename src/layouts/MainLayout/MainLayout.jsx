import Navbar from '../../../components/Navbar';
import styles from './MainLayout.module.scss';
import Head from 'next/head';

const MainLayout = ({ children }) => {
    return <>
        <Head>

        </Head>
        <div className={styles.container}>
            <Navbar></Navbar>
            {children}
        </div>
    </>
}
export default MainLayout