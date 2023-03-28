import React from "react";
import { ApplicationContext } from "../../../App"

interface SignOutProps {

}
export const SignOut = (props: SignOutProps) => {
    const context = React.useContext(ApplicationContext);
    const signOut = (): void => {
        if (context == null) return
        context.setter.setUserWithBalance(null);
    }
    return (<button className='SignOut' onClick={signOut}> Sign Out </button>)
}