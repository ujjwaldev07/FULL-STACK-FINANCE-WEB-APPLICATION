const Loader = ({ lines = 3 }) => {
  return (
    <div className="skeleton-wrap">
      {Array.from({ length: lines }, (_, idx) => (
        <div key={idx} className="skeleton-line" />
      ))}
    </div>
  );
};

export default Loader;
