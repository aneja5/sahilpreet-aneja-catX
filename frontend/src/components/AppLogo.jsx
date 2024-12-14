const AppLogo = (props) => (
  <img
    src="/app-logo.png" // Remove "/public/" from the path
    alt="Logo"
    {...props}
  />
);

export default AppLogo;
