import Image from "next/image";
import Link from "next/link";

import styles from "./navbar.module.css";

export default function Navbar(){
  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <Image className={styles.logo} width={150} height={150} src="/Tahsin.svg" alt="logo"/>
      </Link>
    </nav>
    
  )
}
