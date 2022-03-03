import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SendIcon from "@mui/icons-material/Send";
import { useSnackbar } from "notistack";
import useWebSocket from "react-use-websocket";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const theme = createTheme();

export default function SignUp() {
  // 使用history进行页面跳转
  const history = useHistory()
  // 消息条
  const { enqueueSnackbar } = useSnackbar();
  // 邮箱提交值
  const [mail, setMail] = useState({});
  // 接收服务的返回值
  const [recv, setRecv] = useState({});
  // 根据返回值判断是否需要关闭按钮
  const [judgestyle, setJudgestyle] = useState("false")
  // 邮箱的正则匹配表达式
  const regexEmail = /\w+@+(?:(\w)+(?:(\.){1}[\w|\d]+){1,})/g;
  // 密码的正则匹配表达式
  const regexPassword =
    /^(?:(?=.*[1-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*,\\.]))[0-9a-zA-Z!@#$%^&*,\\.]{8,12}$/g;
  // weboscket api 与 地址设置
  const { sendMessage, lastMessage } = useWebSocket("ws://127.0.0.1:9090");

  // SignUp表单提交事件处理
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    /**
     * {
     *  head: {
     *    type:"signupform"
     *  },
     *  body: {
     *    usename: "xx",
     *    email: "xx",
     *    verification: "xx",
     *    password: "xx"
     *  }
     * }
     */
    const newobj = {
      head: { type: "signupform" },
      body: {
        username: data.get("Username"),
        email: data.get("email"),
        verification: data.get("Verification"),
        password: data.get("password"),
      },
    };

    if (regexPassword.test(data.get("password")) === false) {
      enqueueSnackbar(`Password must include: uppercase,lowercase,numeric and special characters, length [8~12]`, { variant: "error" });
      return
    }
    sendMessage(JSON.stringify(newobj));
  };

  // 获取mail的输入内容 
  const SubmitMail = (e) => {
    setMail(() => e.target.value);
  };

  // 处理验证码发送请求
  const handleVerification = () => {
    /**
     * 发送的JSON格式
     * {
     *   head: {
     *    type: "signupcode"
     *  }
     *  body: {
     *    mail: "xx"
     *  }
     * }
     */
    if (Object.keys(mail).length === 0) return;
    if (regexEmail.test(mail) === false) {
      enqueueSnackbar(`Please correct your email address,such as: username@gmail.com`, { variant: "error" });
      return
    }
    let newobj = {
      head: { type: "signupcode" },
      body: { mail: mail },
    };
    sendMessage(JSON.stringify(newobj));
  };

  // 根据不同的回传值type，采取不同的措施
  useEffect(() => {
    if (lastMessage === null) return
    const RecvMessage = JSON.parse(lastMessage.data)
    switch (RecvMessage.head.type) {
      case 'signupcode' : {
        if (RecvMessage.body.send_state === "false") {
          enqueueSnackbar(`Send verification code failed, Please try it after 60 second!`, { variant: "error" });
          return
        }
        enqueueSnackbar(`Send verification code successfully, Please check your email box!`, { variant: "success" });
        setJudgestyle("true")
        setTimeout( () => {
          setJudgestyle("false")
        }, 60000)
        return
      }
      case 'signupform' : {
        setRecv( () => RecvMessage)
        return
      }
      default: {
        enqueueSnackbar(`Failure to receive the correct message!`, { variant: "warning" });
      }
    }
  }, [lastMessage]);

  // 注册好就直接跳转main页面
  useEffect ( () => {
    if (Object.keys(recv).length === 0) return
    if (recv.body.signup_state === "true") {
      history.replace({
        pathname: '/',
        state: {recv:recv}
      })
    }
    else {
      enqueueSnackbar(`Please correctly your verification code!`, { variant:'error'})
      return
    }
  }, [recv])

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="Username"
                  label="Username"
                  name="Username"
                  autoComplete="Username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={SubmitMail}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  name="Verification"
                  label="Verification"
                  type="Verification"
                  id="Verification"
                  autoComplete="Verification"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Button
                  endIcon={<SendIcon />}
                  style={{ float: "right" }}
                  variant="contained"
                  size="large"
                  sx={{ mt: 1, mb: 2, width: "20ch" }}
                  children={"Verification"}
                  // disabled={judgestyle === "true" ? true : false}
                  onClick={handleVerification}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>

              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
