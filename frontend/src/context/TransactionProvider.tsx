import React, { FC, memo, useEffect, useState } from 'react'
import { ethers } from 'ethers'
import { contractAddress, contractABI } from '../utils/constants'
import { useRecoilState } from 'recoil';
import { walletAtom } from './atom/TransactionAtom';
import { ITransaction, ITransactionWithBase } from '../interface/ITransaction';
import toast, { Toaster } from 'react-hot-toast';

type TransactionContextType = {
    connectWallet: () => void
    onPurchase: (item: ITransaction) => void
    IsLoading: boolean
    transactions: ITransactionWithBase[]
}

export const TransactionContext = React.createContext<TransactionContextType>({ 
    connectWallet: () => { },
    onPurchase : (param : ITransaction) => { },
    IsLoading : false,
    transactions : []
})

const { ethereum } : any = window

const getEthereumContract = () =>{
    const provider = new ethers.providers.Web3Provider(ethereum)
    const signer = provider.getSigner()
    const transactionContract = new ethers.Contract(contractAddress, contractABI, signer)
    return transactionContract
}



const TransactionProvider : FC<Props> = ({ children }) =>{
    const [wallet,setWallet] = useRecoilState(walletAtom)
    const [IsLoading, setIsLoading] = useState(false)
    const [transactions, setTransactions] = useState<ITransactionWithBase[]>([])
    const [transactionCount,setTransactionCount] = useState<number>(0)


    const checkIfWalletIsConnected = async () =>{
        try {
            if(!ethereum){
                toast("Make sure you have metamask!")
                return
            }else{
                console.log("We have the ethereum object", ethereum)
            }
            const accounts = await ethereum.request({ method: 'eth_accounts' })
            if(accounts.length !== 0){
                const account = accounts[0]
                setWallet(account)
                console.log("Found an authorized account:", account)
            }else{
                toast("No authorized account found")
            }
        } catch (error) {
            console.error(error)
        }
    }

    const connectWallet = async () =>{
        try{
            if(!ethereum) return alert(`Please install MetaMask...\nto continue`)
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' })
            console.log('Connected', accounts[0])
            setWallet(accounts[0])
            return accounts[0]
        }catch(err){
            console.log(err)
            toast.error("Error while connecting to wallet...")
        }
    }

    const onPurchase = async (param : ITransaction) =>{
        try {
            if(!ethereum) return toast(`Please install MetaMask...\nto continue`)

            setIsLoading(true)

            const contract = await getEthereumContract()
            console.log('Contract', contract)

            const amount = ethers.utils.parseEther(param.amount.toString())
            const toAccount = "0xA00336b922EC4BcD8dbe762B30Fd123a9C4CdfC8"

           //etherum send transaction
           await ethereum.request({
                method : 'eth_sendTransaction',
                params : [{
                    from : wallet,
                    to : toAccount,
                    gas : '0x5208',
                    value : amount._hex,
                }]
           })

        setIsLoading(true)

        //address payable receiver,
        // uint amount,
        // string memory title,
        // string memory productUID
        const transactionHash = await contract.AddToBlockchain(toAccount, amount, param.title, param.productUID)

        console.log('Transaction : ', transactionHash.hash)

        await transactionHash.wait()

        const transactionCount = await contract.getTransactionCount()

        console.log('Transaction Count', transactionCount)

        setTransactionCount(transactionCount.toNumber());

        setIsLoading(false)

        toast.success("Transaction Successfull")

        } catch (error) {
            setIsLoading(false)
            console.error(error)
        }
    }

    const getAllTransactions = async () => {
        try {
          if (ethereum) {
            const transactionsContract = getEthereumContract();
            const availableTransactions = await transactionsContract.getAllTransactions();
            const structuredTransactions = availableTransactions.map((transaction : any) => ({
              sender: transaction.receiver,
              receiver: transaction.sender,
              timestamp: new Date(transaction.timestamp.toNumber() * 1000).toLocaleString(),
              productUID: transaction.productUID,
              title: transaction.title,
              amount: parseInt(transaction.amount._hex) / (10 ** 18)
            }));
            console.log("transactions : ",structuredTransactions);
            setTransactions(structuredTransactions);

          } else {
            console.log("Ethereum is not present");
            toast.error("Please install MetaMask to continue");
          }
        } catch (error) {
          console.log(error);
          toast.error("Error while fetching transactions");
        }
      };


      useEffect(() => {
        getAllTransactions();
      }, [transactionCount])
      

    useEffect(() => {
        checkIfWalletIsConnected()
    })
    

    return(
        <TransactionContext.Provider 
            value={{ connectWallet, onPurchase, IsLoading, transactions }}>
            <Toaster/>
            {children}
        </TransactionContext.Provider>
    )
}
export default memo(TransactionProvider);

type Props = {
    children : JSX.Element
}