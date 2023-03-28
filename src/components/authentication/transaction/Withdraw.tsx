import { User } from "../../../type";
import Modal from "react-modal"
import React from "react";
import { ApplicationContext } from "../../../App";
import { denom, endpoint, exponent } from "../../../constant";

interface WithdrawProps {
}

export const Withdraw = (props: WithdrawProps) => {
    const context = React.useContext(ApplicationContext);

    const receiveToken = async (amountInput: number): Promise<void> => {
        if (context == null) return;
        if (context.getter.userWithBalance == null) return;
        if (context.getter.client == null) return;
        const address = context.getter.userWithBalance.user.address;
        const client = context.getter.client;
        const requestBody: { address: string, amount: number } = { address: address, amount: amountInput }
        const responseBody: { status: true, user: User } | { status: false, error: string }
            = await (await fetch(endpoint + '/withdraw', {
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
        if (!responseBody.status) {
            alert(responseBody.error);
            return;
        }
        const newBalance = Number.parseInt(((await client.getBalance(address,denom)).amount))*exponent;
        const userWithBalance = {
            user: responseBody.user,
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

    return (<div className='Withdraw'>
        <button onClick={openModal}>Withdraw</button>
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
                    await receiveToken(amountInput);
                }
            }>Submit</button>
            <button onClick={closeModal}>Close</button>
        </Modal>
    </div >);
}