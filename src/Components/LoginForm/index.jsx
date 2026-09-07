import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import logo from "../../assets/Img/LOGO.png";
import InputAdornment from "@mui/material/InputAdornment";
import MailOutlineIcon from "@mui/icons-material/MailOutlined";
import LockIcon from "@mui/icons-material/Lock";
import IconButton from "@mui/material/IconButton";
import VisibilityOutlined from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlined from "@mui/icons-material/VisibilityOffOutlined";
import FormHelperText from "@mui/material/FormHelperText";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { loginSchema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    console.log(data);

    navigate("/dashboard");
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#FFF",
          width: "400px",
          padding: 4,
          borderRadius: 4,
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box className="header-form" sx={{ textAlign: "center", mb: 3 }}>
            <img
              src={logo}
              alt="Logo Morada Nosso Lar"
              style={{ width: "120px", marginBottom: "16px" }}
            />

            <Typography
              variant="h5"
              component="h1"
              sx={{
                fontWeight: "bold",
                color: "#2C3E50",
                mb: 1,
              }}
            >
              Morada Nosso Lar
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "#7F8C8D",
              }}
            >
              Acesse com a conta de administrador para realizar o login
            </Typography>
          </Box>

          <InputLabel sx={{ mt: "10px", mb: "10px", ml: "5px" }}>
            <Typography sx={{ fontSize: "14px", color: "#0A0A0A" }}>
              Email ADM
            </Typography>
          </InputLabel>
          <OutlinedInput
            placeholder="exemplo@gmail.com"
            error={!!errors.email}
            fullWidth
            sx={{ mb: 2, borderRadius: "12px", height: "40px" }}
            startAdornment={
              <InputAdornment position="start">
                <MailOutlineIcon sx={{ color: "#7F8C8D" }} />
              </InputAdornment>
            }
            {...register("email")}
          />

          {errors?.email && (
            <FormHelperText error sx={{ marginLeft: "5px" }}>
              {errors.email.message}
            </FormHelperText>
          )}

          <InputLabel sx={{ mt: "10px", mb: "10px", ml: "5px" }}>
            <Typography
              variant="body2"
              sx={{ fontSize: "14px", color: "#0A0A0A" }}
            >
              Senha
            </Typography>
          </InputLabel>

          <OutlinedInput
            type={showPassword ? "text" : "password"}
            error={!!errors.senha}
            placeholder="********"
            fullWidth
            sx={{ mb: 3, borderRadius: "12px", height: "40px" }}
            startAdornment={
              <InputAdornment position="start">
                <LockIcon sx={{ color: "#7F8C8D" }} />
              </InputAdornment>
            }
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? (
                    <VisibilityOffOutlined />
                  ) : (
                    <VisibilityOutlined />
                  )}
                </IconButton>
              </InputAdornment>
            }
            {...register("senha")}
          />

          {errors?.senha && (
            <FormHelperText error sx={{ mb: "15px" }}>
              {errors.senha.message}
            </FormHelperText>
          )}

          <Button
            type="submit"
            sx={{
              display: "block",
              margin: "0 auto",
              height: "40px",
              width: "80%",
              bgcolor: "#1976D2",
              border: "none",
              borderRadius: "12px",
              color: "#fff",
              fontWeight: "bold",

              "&:hover": {
                bgcolor: "#1565C0",
              },
            }}
          >
            Entrar
          </Button>
        </form>
      </Box>
    </>
  );
}
