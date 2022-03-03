import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import {
  Button,
  Container,
  CssBaseline,
  Typography,
} from "@mui/material";
import { useState, Fragment } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Email from "./Email";
import VerificationCode from './VerificationCode';
import Password from './Password';


const defaultTheme = createTheme();

const steps = [
  "Select master blaster campaign settings",
  "Create an ad group",
  "Create an ad",
];

const theme = createTheme({
  components: {
    MuiButton: {
      variants: [
        {
          props: { variant: 'solid', color: 'secondary', size: 'middle' },
          style: {
            fontSize: 18,
            textTransform: 'none',
            border: `2px solid ${defaultTheme.palette.primary.main}`,
            color: defaultTheme.palette.primary.main,
          },
        },
      ],
    },
  },
});

export default function Forget() {
  // 步骤号
  const [activeStep, setActiveStep] = useState(0);
  // 接收邮箱发送返回值
  const [mailval, setMailval] = useState({})

  const handleNext = () => {
  }

  const recvMail = (obj) => {
    setMailval( ()=>obj)
  }

  return (
      <Container component="main" sx={{ width: "100%" }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            width: "100%",
            alignItems: "center",
          }}
        >
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <Fragment>
              <Typography sx={{ mt: 2, mb: 1 }}>
                All steps completed - you&apos;re finished
              </Typography>
            </Fragment>
          ) : (
            <Fragment>
              <CssBaseline sx={{mt:10}} />
              <Box
                variant="solid"
                color="secondary" 
                size="middle" 
                sx={{ 
                  m: 1,
                  display: 'grid',
                  columnGap: 1,
                  rowGap: 1,
                  gridTemplateColumns: 'repeat(10, 1fr)',
                }}
              >
                <Email recvMail={recvMail}/>
                <ThemeProvider theme={theme} >
                  <Button
                    variant="solid" 
                    color="secondary" 
                    size="middle" 
                    endIcon={<ArrowForwardIcon/>}
                    sx={{ 
                      mt: 3,
                      gridRow: '2',
                      gridColumn: '10'
                    }}
                    onClick={handleNext}
                  >
                    {activeStep === steps.length-1 ? 'Finish' : 'Next'}
                  </Button>
                  <Button
                    variant="solid" 
                    color="secondary" 
                    size="middle" 
                    startIcon={<ArrowBackIcon/>}
                    sx={{ 
                      mt: 3,
                      gridRow: '2',
                      gridColumn: '1'
                    }}
                    onClick={()=>setActiveStep(pre=>{return pre <= 0 ? pre : pre-1})}
                  >
                    Back
                  </Button>
                </ThemeProvider>
              </Box>
            </Fragment>
          )}
        </Box>
      </Container>
  );
}
