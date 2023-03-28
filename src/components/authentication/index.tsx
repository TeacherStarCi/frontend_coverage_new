import { GameSection } from "./game"
import { SignOut } from "./signout"
import { Deposit } from "./transaction/Deposit"
import { Profile } from "./transaction/Profile"
import { Withdraw } from "./transaction/Withdraw"

export interface AuthenticationSectionProps {

}

export const AuthenticationSection = (props: AuthenticationSectionProps) => {
    return (
        <div className='AuthenticationSection'> 
          <Profile> </Profile>
          <Deposit> </Deposit>
          <Withdraw> </Withdraw>
          <SignOut> </SignOut>
          <GameSection> </GameSection>
        </div>
    )
}