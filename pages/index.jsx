import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css';
import MainLayout from '../src/layouts/MainLayout/MainLayout';

const Home = () => {
  return (
    <div className={styles.container}>
      <h1>Next Firebase Auth</h1>
    </div>
  )
}
Home.getLayout = function getLayout(Home) {
  return <MainLayout>{Home}</MainLayout>;
};

export default Home