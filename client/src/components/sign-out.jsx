

const SignOut = ({ setAuth }) => {
    localStorage.removeItem("token");
    setAuth(false);
  };
  
  export default SignOut;