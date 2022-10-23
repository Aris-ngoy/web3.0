// address sender;
// address receiver;
// uint amount;
// string title;
// uint256 timestamp;
// string productUID;

export interface ITransaction {
    productUID: string;
    title : string;
    amount : number;
}

export interface ITransactionBase {
    sender : string;
    receiver : string;
    timestamp : number;
}

export interface ITransactionWithBase extends ITransaction, ITransactionBase {
    
}