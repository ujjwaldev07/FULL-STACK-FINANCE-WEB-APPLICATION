import { motion } from "framer-motion";

const Button = ({ children, variant = "primary", className = "", ...props }) => {
  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      whileHover={{ y: -1 }}
      className={`btn btn-${variant} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
