import React from "react"
import { ApplicationContext } from "../../../App"

interface ProfileProps {

}
export const Profile = (props: ProfileProps) => {
  const context = React.useContext(ApplicationContext);
  return (
    <div className = 'Profile'>
       Address: {context?.getter.userWithBalance?.user.address} <br/>
       Username: {context?.getter.userWithBalance?.user.username} <br/>
       Balance:  {context?.getter.userWithBalance?.balance} <br/>
       Asset: {context?.getter.userWithBalance?.user.asset} <br/>
    </div>
  )

}