import type { ReactElement, ReactNode } from "react";
import type { TransactionDirection } from "../TransactionDetails";
import "./styles.pcss";

type TransactionInfoRowProps = {
  label: string;
  value: ReactNode;
  className?: string;
};

const TransactionInfoRow = ({
  label,
  value,
  className = "",
}: TransactionInfoRowProps): ReactElement => (
  <div className={`transaction_info_row${className ? ` ${className}` : ""}`}>
    <span className="transaction_info_label">{label}</span>
    {typeof value === "string" || typeof value === "number" ? (
      <span className="transaction_info_value">{value}</span>
    ) : (
      value
    )}
  </div>
);

type TransactionInfoProps = {
  details: TransactionDirection;
};

export const TransactionInfo = ({
  details,
}: TransactionInfoProps): ReactElement => {
  const {
    chainLogo,
    chainName,
    chainId,
    chainSelector,
    txHash,
    gasCost,
    chainCurrency,
  } = details;

  return (
    <div className="transaction_info">
      <TransactionInfoRow
        label="Chain"
        value={
          <div className="transaction_info_chain">
            <img
              src={chainLogo}
              alt={chainName}
              className="transaction_info_chain_logo"
            />
            <span className="transaction_info_value">{chainName}</span>
          </div>
        }
      />
      <TransactionInfoRow label="Chain ID" value={chainId} />
      <TransactionInfoRow label="Selector" value={chainSelector} />
      <TransactionInfoRow label="TX Hash" value={txHash} className="hash_row" />
      <TransactionInfoRow
        label="Gas Fee"
        value={
          <span className="transaction_info_value">
            {gasCost}
            <span className="transaction_info_currency">{chainCurrency}</span>
          </span>
        }
      />
    </div>
  );
};
