const Container = ({ children }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        maxWidth: '1140px',
        margin: '0 auto',
        width: '100%',
      }}
    >
      {children}
    </div>
  );
};

export default Container;