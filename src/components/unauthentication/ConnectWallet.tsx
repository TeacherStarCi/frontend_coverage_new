import { Window as KeplrWindow } from '@keplr-wallet/types';
import { OfflineSigner } from '@cosmjs/proto-signing';
import { Coin, SigningStargateClient } from '@cosmjs/stargate';
import { chainId, denom, exponent, getTestnetChainInfo, rpcEndpoint, endpoint } from '../../constant';
import { ApplicationContext } from '../../App';
import React from 'react';
import { User } from '../../type';

export interface ConnectWalletProps {

}

declare global {
    interface Window extends KeplrWindow { }
}

export const ConnectWallet = (props: ConnectWalletProps) => {

    //context
    const context = React.useContext(ApplicationContext);

    const connectWallet = async () => {
        const { keplr } = window
        if (!keplr) {
            alert('Keplr extension is not installed.');
            return;
        }
        await keplr.experimentalSuggestChain(getTestnetChainInfo())
        const offlineSigner: OfflineSigner = window.getOfflineSigner!(chainId);
        const signingClient: SigningStargateClient = await SigningStargateClient.connectWithSigner(
            rpcEndpoint,
            offlineSigner
        )
        const address = (await keplr.getKey(chainId)).bech32Address;
        if (address !== '') {
            if (context != null) {
                context.setter.setClient(signingClient);
                const keyUser = (await keplr.getKey(chainId));

                const requestBody: {
                    address: string,
                    username: string
                } = {
                    address: keyUser.bech32Address,
                    username: keyUser.name,
                }

                const responseBody: { status: true, user: User, token: string } | { status: false, error: string }
                    = await (await fetch(endpoint + '/sign-in', {
                        method: 'POST', // *GET, POST, PUT, DELETE, etc.
                        mode: 'cors', // no-cors, *cors, same-origin
                        headers: {
                            'Content-Type': 'application/json',
                            // 'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        body: JSON.stringify(requestBody), // body data type must match "Content-Type" header
                    }
                    )
                    ).json()
                if (responseBody.status) {
                    const clientBalance: Coin = await signingClient.getBalance(address, denom);
                    const balance = Number.parseInt(clientBalance.amount) * exponent;
                    const user = responseBody.user
                    const userWithBalance = {
                        user: user,
                        balance: balance
                    }
                    context.setter.setUserWithBalance(userWithBalance)
                }

            }
        }
    }

    return (
        <div className='ConnectWallet'>
            <button onClick={connectWallet}> Connect Wallet </button>
        </div>
    )
}

