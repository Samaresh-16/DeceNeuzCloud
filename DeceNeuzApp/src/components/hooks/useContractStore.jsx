import { ethers } from "ethers";
import { create } from "zustand";
import { toast } from "react-toastify";

// Define the Zustand store
export const useContractStore = create((set) => ({
  account: null,
  signer: null,
  provider: null,
  contract: null,

  connectWallet: async () => {
    try {
      // Check if MetaMask is installed
      if (!window.ethereum) {
        throw new Error("MetaMask is not installed!");
      }

      // Request access to the user's MetaMask wallet
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Create a new Ethers.js provider and signer
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Get the user's Ethereum account
      const accounts = await provider.listAccounts();
      const account = accounts[0];

      // Set the state in the Zustand store
      setAccount(account);
      setSigner(signer);
      setProvider(provider);
      toast.success(`Connected to account: ${account}`);
    } catch (error) {
      toast.error("Error connecting to MetaMask!");
      console.error("Error connecting to MetaMask:", error);
    }
  },
  connectContract: async (contractAddress, contractABI) => {
    try {
      const { signer } = useContractStore.getState();

      // Create a new contract instance
      const contract = new ethers.Contract(
        contractAddress,
        contractABI,
        signer
      );

      // Update the state in the Zustand store
      set({ contract });
    } catch (error) {
      toast.error("Error connecting to contract!");
      console.error("Error connecting to contract:", error);
    }
  },
  disconnect: async () => {
    try {
      // Disconnect the MetaMask wallet
      await window.ethereum.request({
        method: "eth_requestAccounts",
        params: [{ eth_accounts: {} }],
      });

      // Reset the state in the Zustand store
      setAccount(null);
      setSigner(null);
      setProvider(null);
      setContract(null);
      toast.success("Disconnected");
    } catch (error) {
      toast.error("Error disconnecting from MetaMask");
      console.error("Error disconnecting from MetaMask:", error);
    }
  },
}));

export const setAccount = (account) => useContractStore.setState({ account });
export const setSigner = (signer) => useContractStore.setState({ signer });
export const setProvider = (provider) =>
  useContractStore.setState({ provider });
export const setContract = (contract) =>
  useContractStore.setState({ contract });
