import { motion } from "framer-motion";

const Card = ({ children, className = "", hoverable = false }) => {
  return (
    <motion.section
      className={`card ${className}`}
      whileHover={hoverable ? { y: -3 } : undefined}
      transition={{ duration: 0.2 }}
    >
      {children}
    </motion.section>
  );
};

export default Card;
