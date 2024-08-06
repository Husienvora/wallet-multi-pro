import { ethers } from 'ethers';
import { hdkey } from 'ethereumjs-wallet';
import * as bip39 from 'bip39';

class WalletSDK {
  constructor() {
    this.networks = {
      mainnet: {
        name: 'Mainnet',
        rpcUrl:
          'https://eth-mainnet.g.alchemy.com/v2/Bmfim-KdRn4K7y5VxxwaWC77mm-1Pr91',
        chainId: 1,
      },
      sepolia: {
        name: 'Sepolia',
        rpcUrl:
          'https://eth-sepolia.g.alchemy.com/v2/Bmfim-KdRn4K7y5VxxwaWC77mm-1Pr91',
        chainId: 5,
      },
    };
    this.currentNetwork = 'mainnet';
    this.provider = null;
    this.accounts = {};
    this.tokens = {};
    this.hdPath = "m/44'/60'/0'/0/";
    this.initProvider();
  }

  initProvider() {
    this.provider = new ethers.JsonRpcProvider(
      this.networks[this.currentNetwork].rpcUrl
    );
  }

  addNetwork(name, rpcUrl, chainId) {
    this.networks[name] = { name, rpcUrl, chainId };
  }

  setNetwork(networkName) {
    if (this.networks[networkName]) {
      this.currentNetwork = networkName;
      this.initProvider();
      // Reconnect all accounts to the new network
      Object.values(this.accounts).forEach((account) => {
        account.wallet = account.wallet.connect(this.provider);
      });
    } else {
      throw new Error('Network not found');
    }
  }

  async createAccount(index = 0) {
    const mnemonic = bip39.generateMnemonic();
    return this.importAccount(mnemonic, index);
  }

  async importAccount(mnemonic, index = 0) {
    if (!bip39.validateMnemonic(mnemonic)) {
      throw new Error('Invalid mnemonic');
    }
    const seed = await bip39.mnemonicToSeed(mnemonic);
    const hdWallet = hdkey.fromMasterSeed(seed);
    const wallet = hdWallet.derivePath(this.hdPath + index).getWallet();
    const account = new ethers.Wallet(wallet.getPrivateKey(), this.provider);

    this.accounts[account.address] = {
      wallet: account,
      mnemonic,
      index,
    };

    return account.address;
  }

  importPrivateKey(privateKey) {
    const account = new ethers.Wallet(privateKey, this.provider);
    this.accounts[account.address] = {
      wallet: account,
      privateKey,
    };
    return account.address;
  }

  async getBalance(address) {
    if (!this.accounts[address]) throw new Error('Account not found');
    console.log(this.accounts[address].wallet);

    const balance = await this.accounts[address].wallet.provider.getBalance(
      address
    );
    return ethers.formatEther(balance);
  }

  async sendTransaction(from, to, amount) {
    if (!this.accounts[from]) throw new Error('Sender account not found');
    const tx = await this.accounts[from].wallet.provider.sendTransaction({
      to: to,
      value: ethers.parseEther(amount),
    });
    return tx;
  }

  async signMessage(address, message) {
    if (!this.accounts[address]) throw new Error('Account not found');
    return await this.accounts[address].wallet.provider.signMessage(message);
  }

  async getGasPrice() {
    return ethers.formatUnits(await this.provider.getGasPrice(), 'gwei');
  }

  async estimateGas(from, to, value, data = '0x') {
    const gasEstimate = await this.provider.estimateGas({
      from,
      to,
      value: ethers.parseEther(value),
      data,
    });
    return gasEstimate.toString();
  }

  // Token methods
  addToken(address, symbol, decimals) {
    this.tokens[symbol] = { address, symbol, decimals };
  }

  async getTokenBalance(accountAddress, tokenSymbol) {
    if (!this.accounts[accountAddress]) throw new Error('Account not found');
    if (!this.tokens[tokenSymbol]) throw new Error('Token not found');

    const token = this.tokens[tokenSymbol];
    const abi = ['function balanceOf(address) view returns (uint256)'];
    const contract = new ethers.Contract(token.address, abi, this.provider);
    const balance = await contract.balanceOf(accountAddress);
    return ethers.formatUnits(balance, token.decimals);
  }

  async sendToken(from, to, amount, tokenSymbol) {
    if (!this.accounts[from]) throw new Error('Sender account not found');
    if (!this.tokens[tokenSymbol]) throw new Error('Token not found');

    const token = this.tokens[tokenSymbol];
    const abi = [
      'function transfer(address to, uint256 amount) returns (bool)',
    ];
    const contract = new ethers.Contract(
      token.address,
      abi,
      this.accounts[from].wallet
    );
    const tx = await contract.transfer(
      to,
      ethers.parseUnits(amount, token.decimals)
    );
    return tx;
  }

  getAccounts() {
    return Object.keys(this.accounts);
  }

  getNetworks() {
    return Object.keys(this.networks);
  }

  getCurrentNetwork() {
    return this.currentNetwork;
  }
}

export default WalletSDK;
