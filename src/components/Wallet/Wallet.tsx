import TotalBalance from '../TotalBalance/TotalBalance';
import TransactionHistory from '../TransactionHistory/TransactionHistory';
import s from './Wallet.module.scss'

const Wallet = ()=>{
    return (
      <div className={`${s.walletPage} container`}>
        <TotalBalance />
        <TransactionHistory />
      </div>
    );
}

export default Wallet