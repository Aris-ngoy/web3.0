// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract ProductDetail {

    uint256 public ProductDetailCount;

    event Transfer(
        address from,
        string[] items,
        string productId,
        uint256 timestamp
    );

    struct ProductDetailStruct {
        address sender;
        string[] items; 
        string  productId;
        uint256 timestamp;
    }

    ProductDetailStruct[] ProductDetails;
    
    function AddToBlockchain(
        string[] calldata itemList,
        string memory productId
    ) public {
        ProductDetailCount++;

        ProductDetails.push(
            ProductDetailStruct(
                msg.sender,
                itemList,
                productId,
                block.timestamp
            )
        );
    }

    function getAllProductDetails()
        public
        view
        returns (ProductDetailStruct[] memory)
    {
        return ProductDetails;
    }

    function getProductDetailCount() public view returns (uint256) {
        return ProductDetailCount;
    }
}
