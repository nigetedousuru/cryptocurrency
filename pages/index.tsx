import Head from "next/head";
import styles from "../styles/style.module.css";
import Image from "next/image";

type Props = {
  bitcoinRate: string,
  ethereumRate: string,
  rippleRate: string,
}

const getRate = async() => {
  const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Cripple&vs_currencies=usd");
  const res = await response.json();
  return res;
}

export const getServerSideProps = async () => {
  const res = await getRate();
  //console.log(res);
  return {
    props: {
      bitcoinRate: res.bitcoin.usd,
      ethereumRate: res.ethereum.usd,
      rippleRate: res.ripple.usd,
    }
  };
};

export default function Home(props: Props) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Cryptocurrency Website Design - Easy Tutorials</title>
      </Head>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <Image src="/img/logo.png" width={100} height={100} className={styles.logo} alt="logo"/>
          <ul className={styles.list}>
            <li className={styles.item}><a href="#" className={styles.itemText}>Market</a></li>
            <li className={styles.item}><a href="#" className={styles.itemText}>Features</a></li>
            <li className={styles.item}><a href="#" className={styles.itemText}>White Papers</a></li>
            <li className={styles.item}><a href="#" className={styles.itemText}>About Us</a></li>
          </ul>
          <a href="#" className={styles.navBtn}>EN</a>
        </nav>

        <div className={styles.content}>
          <h1 className={styles.contentTitle}> BUY & <br/>SELL <span className={styles.contentTitleSpan}>Crypto</span></h1>
          <p className={styles.sentence}>World&apos;s biggest Cryptocurrency exchange available on Web as well as mobile phone.</p>
          <a href="#" className={styles.contentBtn}>EXPLORE MORE</a>
        </div>
      </div>

      <div className={styles.coinList}>
        <div className={styles.coinItem}>
          <Image src="/img/coins/BTC.png" width={200} height={200} className={styles.coin} alt="BTC"/>
          <div className={styles.overview}>
            <h3 className={styles.price}>${props.bitcoinRate ?? "00"}</h3>
            <p className={styles.coinName}>Bitcoin</p>
          </div>
        </div>
        <div className={styles.coinItem}>
          <Image src="/img/coins/ETH.png" width={200} height={200} className={styles.coin} alt="ETH"/>
          <div className={styles.overview}>
            <h3 className={styles.price}>${props.ethereumRate ?? "00"}</h3>
            <p className={styles.coinName}>Ethereum</p>
          </div>
        </div>
        <div className={styles.coinItem}>
          <Image src="/img/coins/XRP.png" width={200} height={200} className={styles.coin} alt="XRP"/>
          <div className={styles.overview}>
            <h3 className={styles.price}>${props.rippleRate ?? "00"}</h3>
            <p className={styles.coinName}>Ripple</p>
          </div>
        </div>
      </div>
    </>
  )
}
