export default function ButtonIcon({ label, value, onClick, children }) {
  const icon = children.find((child) => child.props.id === value);

  return (
    <button id={`btn-${label}`} type="button" onClick={onClick}>
      {icon}
      {/* <span className="sr-only">{label}</span> */}
    </button>
  );
}
