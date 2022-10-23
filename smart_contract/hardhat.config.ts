import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

//https://eth-goerli.g.alchemy.com/v2/jzPwxiQi6baT7204Sn8FJ_z1BWK_OloJ
//metamask private key = 2630d413826b8cdf89a67b086ca865faa670df6500a7b06f20d9214fe4f9d335

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/jzPwxiQi6baT7204Sn8FJ_z1BWK_OloJ`,
      accounts: [`2630d413826b8cdf89a67b086ca865faa670df6500a7b06f20d9214fe4f9d335`],
    }
  }
};

export default config;
