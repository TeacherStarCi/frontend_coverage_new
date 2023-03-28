import { Coin, DeliverTxResponse, StdFee } from "@cosmjs/stargate";
import React from "react";
import { ApplicationContext } from "../../../App";
import { denom, endpoint, exponent, inverseExponent, serverAddress } from "../../../constant";
import { User } from "../../../type";
import Modal from "react-modal"

interface DepositProps {

}

export const Deposit = (props: DepositProps) => {
    const context = React.useContext(ApplicationContext)

    const sendToken = async (amountInput: number): Promise<void> => {
        if (context == null) return;
        if (context.getter.userWithBalance == null
            || context.getter.client == null) return;
        const sender = context.getter.userWithBalance.user.address;
        const receiver: string = serverAddress;
        const amount: Coin[] = [{
            denom: denom,
            amount: (amountInput * inverseExponent).toString(),
        }]

        const fee: StdFee = {
            amount: [{
                denom: denom,
                amount: '200',
            },],
            gas: '200000',
        }
        const client = context.getter.client
        const sendResult: DeliverTxResponse = await client.sendTokens(sender, receiver, amount, fee, '');
        const txHash = sendResult.transactionHash
        const secondRequestBody: { txHash: string, address: string } = { txHash: txHash, address: sender }
        const secondResponseBody: { status: true, user: User } | { status: false, error: string }
            = await (await fetch(endpoint + '/deposit', {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                headers: {
                    'Content-Type': 'application/json',
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(secondRequestBody), // body data type must match "Content-Type" header
            }
            )
            ).json()
        if (!secondResponseBody.status) {
            alert(secondResponseBody.error);
            return;
        }
        const user: User = secondResponseBody.user
        const newBalance = Number.parseInt(((await client.getBalance(sender,denom)).amount))*exponent;
        const userWithBalance = {
            user: user,
            balance: newBalance
        }
        context.setter.setUserWithBalance(userWithBalance)

    }

    const [isOpen, setIsOpen] = React.useState(false);
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            transform: 'translate(-50%, -50%)',
        },
    };
    Modal.setAppElement('#root');
    const openModal = () => setIsOpen(true);
    const afterOpenModal = () => { };
    const closeModal = () => setIsOpen(false);

    //input
    let tempAmountInput = ''
    let amountInput = 0

    return (<div className='Deposit'>
        <button onClick={openModal}>Deposit</button>
        <Modal
            isOpen={isOpen}
            onAfterOpen={afterOpenModal}
            // nothing
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Deposit"
        >
            <h1>Deposit</h1>
            Amount(EAURA) :  <input type='number' onChange={(event: React.ChangeEvent<HTMLInputElement>) => tempAmountInput = event.target.value} /> <br />
            <button onClick={
                async () => {
                    amountInput = parseFloat(tempAmountInput);
                    closeModal();
                    await sendToken(amountInput);
                }
            }>Submit</button>
            <button onClick={closeModal}>Close</button>
        </Modal>
    </div >);
}