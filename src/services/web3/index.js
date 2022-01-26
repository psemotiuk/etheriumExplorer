import Web3 from 'web3';

export const web3Instance = new Web3(window?.web3?.currentProvider);

export const getRecentBlockNumber = async () => {
  const recentBlock = await web3Instance.eth.getBlockNumber();

  return recentBlock;
};

export const getBLock = async (number) => {
  const block = await web3Instance.eth.getBlock(number);

  return block;
};

export const getLastTenBlocks = async () => {
  const recentBlock = await getRecentBlockNumber();
  const firstOfTen = recentBlock - 10;
  const blockList = [];

  for (let i = recentBlock; i > firstOfTen; i--) {
    blockList.push(await getBLock(i));
  }

  return blockList;
};

export const getTransaction = async (hashNumber) => {
  const transaction = await web3Instance.eth.getTransaction(hashNumber);

  return transaction;
};

export const getBlockTransactions = async (hashes) =>
  Promise.all(hashes.map(async (hashString) => getTransaction(hashString)));

export const getLastTenTransactions = async (hashes) => {
  const lastTenBlocks = await getLastTenBlocks();
  const lastBLock = lastTenBlocks[9];
  const tranasctionsList = [];
  const firstOfTen = lastBLock.transactions.length - 10;

  for (let i = firstOfTen; i < lastBLock.transactions.length; i++) {
    tranasctionsList.push(lastBLock.transactions[i]);
  }

  const txs = await getBlockTransactions(tranasctionsList);

  return txs;
};
