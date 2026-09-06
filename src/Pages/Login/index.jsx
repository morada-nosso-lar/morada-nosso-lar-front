import Box from "@mui/material/Box";
import LoginForm from "../../Components/LoginForm";

export default function Login() {
  return (

    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#EAF4FC",
      }}
    >
      <LoginForm />
    </Box>
  );
}