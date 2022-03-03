import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState, useEffect,} from "react";
import { useHistory } from "react-router-dom";
import { useSnackbar } from 'notistack';
import useWebSocket from 'react-use-websocket';

const theme = createTheme();

export default function SignIn() {
  // 消息条
  const { enqueueSnackbar } = useSnackbar(); 
  // 使用useHistory进行相应的页面跳转
  const history = useHistory()
  // websocket表单返回的值
  const [recv, setRecv] = useState({})
  // 邮箱的正则匹配
  const regexEmail = /\w+@+(?:(\w)+(?:(\.){1}[\w|\d]+){1,})/g;
  // 密码的正则匹配 
  const regexPassword = /^(?:(?=.*[1-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*,\\.]))[0-9a-zA-Z!@#$%^&*,\\.]{8,12}$/g
  // api设置 
  const {
    sendMessage,
    lastMessage
  } = useWebSocket('ws://127.0.0.1:9090')

  // signup button的事件处理
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    /**
     * {
     *  head: {
     *    type: "loginform"
     *  },
     *  body: {
     *    email: "xx",
     *    password: "xx"
     *  }
     * }
     */
    let newobj = {
      head: { type: "loginform" },
      body: { email: data.get("email"), password: data.get("password")},
    };
    if (regexEmail.test(data.get("email")) === false) {
      enqueueSnackbar(`Please correct your email address,such as: username@gmail.com`, { variant: "error" });
      return
    }
    if (regexPassword.test(data.get("password")) === false) {
      enqueueSnackbar(`Password must include: uppercase,lowercase,numeric and special characters, length [8~12]`, { variant: "error" });
      return
    }
    sendMessage(JSON.stringify(newobj));
  };

  useEffect( ()=> {
    if (lastMessage === null) return
    const RecvMessage = JSON.parse(lastMessage.data)
    setRecv(()=>RecvMessage)
  }, [lastMessage])

  // 登陆成功后,跳转到主界面
  useEffect(() => {
    if (Object.keys(recv).length === 0) return
    const state = recv.body.login_state
    if (state === "true") {
      history.replace({
        pathname: "/",
        state: { recv: recv },
      });
    } else {
      enqueueSnackbar(`Verification Code is not correctly!`, { variant: "error" })
    }
  }, [recv]);


  /**
   * 消息条功能测试
   */


  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 5 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
