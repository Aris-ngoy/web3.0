// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract Transactions {
    uint256 public transactionCount;

    event Transfer(
        address from,
        address receiver,
        uint amount,
        string title,
        uint256 timestamp,
        string productUID
    );

    struct TransactionStruct {
        address sender;
        address receiver;
        uint amount;
        string title;
        uint256 timestamp;
        string productUID;
    }

    TransactionStruct[] transactions;

    // mapping(uint256 => TransactionStruct) public transactions;

    function AddToBlockchain(
        address payable receiver,
        uint amount,
        string memory title,
        string memory productUID
    ) public {
        transactionCount++;
        transactions.push(
            TransactionStruct(
                msg.sender,
                receiver,
                amount,
                title,
                block.timestamp,
                productUID
            )
        );
    }

    function getAllTransactions()
        public
        view
        returns (TransactionStruct[] memory)
    {
        return transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }
}
