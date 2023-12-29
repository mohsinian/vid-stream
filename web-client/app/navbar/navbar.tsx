'use client';
import Image from "next/image";
import Link from "next/link";
import styles from "./navbar.module.css";
import SignIn from "./signIn";
import { onAuthStateChangedListener } from "../firebase/firebase";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import Upload from "./upload";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  });

  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <Image
          className={styles.logo}
          width={150}
          height={150}
          src="/Tahsin.svg"
          alt="logo"
        />
      </Link>
      {
        user && <Upload />
      }
      <SignIn user={user} />
    </nav>
  );
}
