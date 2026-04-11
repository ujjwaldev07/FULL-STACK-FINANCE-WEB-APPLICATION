const Input = ({ label, id, className = "", ...props }) => {
  return (
    <label className={`field ${className}`} htmlFor={id}>
      {label ? <span className="field-label">{label}</span> : null}
      <input id={id} className="field-input" {...props} />
    </label>
  );
};

export default Input;
