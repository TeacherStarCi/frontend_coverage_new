import { ConnectWallet } from "./ConnectWallet"

export interface UnauthenticationSectionProps {

}

export const UnauthenticationSection = (props: UnauthenticationSectionProps) => {
    return (
        <div className='AuthenticationSection'> 
        <ConnectWallet> </ConnectWallet> 
        </div>
    )
}