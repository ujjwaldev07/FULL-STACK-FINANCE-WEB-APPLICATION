import { FiArrowDownRight, FiArrowUpRight, FiCreditCard } from "react-icons/fi";
import Card from "./ui/Card";

const cardItems = [
  { key: "balance", label: "Total Balance", icon: FiCreditCard, tone: "neutral" },
  { key: "totalIncome", label: "Income", icon: FiArrowUpRight, tone: "success" },
  { key: "totalExpenses", label: "Expenses", icon: FiArrowDownRight, tone: "danger" },
];

const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(value || 0);

const SummaryCards = ({ summary }) => {
  return (
    <section className="summary-grid">
      {cardItems.map((item) => (
        <Card key={item.key} className="summary-card" hoverable>
          <div className={`summary-icon summary-${item.tone}`}>
            <item.icon />
          </div>
          <p>{item.label}</p>
          <h3>{formatCurrency(summary?.[item.key])}</h3>
        </Card>
      ))}
    </section>
  );
};

export default SummaryCards;
