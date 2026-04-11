import { AnimatePresence, motion } from "framer-motion";
import Button from "./Button";

const Modal = ({ isOpen, title, description, onConfirm, onClose, confirmText = "Confirm" }) => {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="modal-content"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            onClick={(event) => event.stopPropagation()}
          >
            <h3>{title}</h3>
            <p>{description}</p>
            <div className="modal-actions">
              <Button variant="ghost" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button type="button" onClick={onConfirm}>
                {confirmText}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Modal;
