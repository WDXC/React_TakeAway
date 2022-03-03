import { TextField } from '@mui/material'
import useWebSocket from 'react-use-websocket';
import React, {useState,useEffect} from 'react'
import { useSnackbar } from "notistack";

export default function Email(props) {
    // 接收传入的参数
    const recvMail = props
    // 接收后端的返回值 
    const [param, setParam] = useState({})
    // 消息条
    const { enqueueSnackbar } = useSnackbar();

    const {
        sendMessage,
        lastMessage,
    } = useWebSocket('ws://127.0.0.1:9090')

    const handleMail = (e) => {
        const mail = e.target.value
        const newObj = {
            head: {type: 'forgetcode'},
            body: {mail: mail}
        }
        sendMessage(JSON.stringify(newObj))
    }

    useEffect(() => {
        if (lastMessage === null) return
        const newObj = JSON.parse(lastMessage.data)
        let type = newObj.head.send_state;
        if (type === "true") {
            setParam(param);
            return
        }
        enqueueSnackbar(`Send Verification code failed...`, {variant:'error'})
    }, [lastMessage])

    useEffect( () => {
        if (Object.keys(param).length === 0) return
        recvMail(param)
    }, [param])

    return (
        <TextField 
            required
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onBlur={handleMail}
            sx={{
                mt: 3,
                gridRow: '1',
                gridColumn: 'span 10'
            }}/>
    )
}
