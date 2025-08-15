import type { ReactElement } from "react";
import { TransactionInfo } from "../TransactionInfo";
import "./styles.pcss";

export type TransactionDirection = {
  readonly chainLogo: string;
  readonly chainName: string;
  readonly chainId: number;
  readonly chainCurrency: string;
  readonly chainSelector: number;
  readonly txHash: string;
  readonly gasCost: number;
};

type TransactionDetailsProps = {
  from: TransactionDirection;
  to: TransactionDirection;
};

export const TransactionDetails = ({
  from,
  to,
}: TransactionDetailsProps): ReactElement => (
  <div className="transaction_details">
    <div className="transaction_details_row">
      <span className="transaction_details_label">From</span>
      <TransactionInfo details={from} />
    </div>
    <div className="transaction_details_row">
      <span className="transaction_details_label">To</span>
      <TransactionInfo details={to} />
    </div>
  </div>
);
