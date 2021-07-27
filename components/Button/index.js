export default function Button({ children, onClick, disabled }) {
  return (
    <>
      <button onClick={onClick} disabled={disabled}>
        {children}
      </button>
      <style jsx>{`
        button {
          background: black;
          border: 0;
          color: white;
          border-radius: 9999px;
          font-size: 16px;
          font-weight: 800;
          padding: 8px 24px;
          cursor: pointer;
          transition: opacity 0.3s ease;
          user-select: none;
        }
        button:hover {
          opacity: 0.7;
        }
        button[disabled] {
          pointer-events: none;
          opacity: 0.2;
        }
      `}</style>
    </>
  );
}
