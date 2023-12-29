'use client';
import styles from "./signIn.module.css";
import { Fragment, use } from "react";
import { signInWithGoogle } from "../firebase/firebase";
import { signOut } from "../firebase/firebase";
import { User } from "firebase/auth";

interface SignInProps {
    user: User | null;
}


export default function SignIn({user}:SignInProps){
    return (
        <Fragment>
            {
                user?
                
                    <div className={styles.container}>
                        <h3>You are signed in as {user.displayName}</h3>
                        <button className={styles.button} onClick={signOut}>Sign Out</button>
                    </div>
                :
                    <button className={styles.button} onClick={signInWithGoogle}>Sign In</button>
            }
            </Fragment>
    )
}