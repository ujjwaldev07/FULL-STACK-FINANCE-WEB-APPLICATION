import EmptyState from "./ui/EmptyState";

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(value || 0);

const formatDate = (value) => new Date(value).toLocaleDateString();

const TransactionTable = ({ transactions }) => {
  if (!transactions.length) {
    return <EmptyState title="No transactions yet" description="Try changing filters or add a new transaction." />;
  }

  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Note</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn._id}>
              <td>{formatDate(txn.date)}</td>
              <td className={txn.type === "income" ? "income" : "expense"}>{txn.type}</td>
              <td>{txn.category?.name || "N/A"}</td>
              <td>{formatCurrency(txn.amount)}</td>
              <td>{txn.note || "-"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
