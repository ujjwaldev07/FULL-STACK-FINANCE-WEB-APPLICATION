import { motion } from "framer-motion";
import { FiInbox } from "react-icons/fi";

const EmptyState = ({ title, description }) => {
  return (
    <motion.div className="empty-state" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <FiInbox size={24} />
      <h4>{title}</h4>
      <p>{description}</p>
    </motion.div>
  );
};

export default EmptyState;
