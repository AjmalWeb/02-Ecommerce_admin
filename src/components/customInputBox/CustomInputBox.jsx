import React from 'react';
import { Box,Typography } from "@mui/material";
import {styled} from '@mui/material/styles';
const CustomInput = styled(Box)(
    ({ props }) =>`
    width: 100%;
    position: relative;

    & .icon {
        position: absolute;
        text-align: center;
        left:15px;
        top:50%;
        transform: translateY(-50%);

    }

    & input {
        width: 100%;
        padding: 15px 15px 15px 50px;
        text-align: left;
        box-sizing:border-box;
        border-radius: 50px;
        font-size: 1rem;
        font-weight: lighter;
        transition:ease-in-out border .01s;
        margin:0;
        outline:none;
    }

    & .error_border{
        color:#e55353;
        border:1px solid #e55353;
    }

    & .normal_border{
        border:1px solid  #1cb95a ;
        // border:1px solid #b5b5b5;

    }
    
    & .error_border::placeholder {
        color: #e55353;
        opacity:.4;
      }

    & .normal_border::placeholder {
        color:  #5bf995 ;
        opacity:.8;
      }

    & .normal_border:focus {
        border:1px solid #0a640b ;
        outline:1px solid #0a640b;
        // outline:1px solid #30d5c8;

    }

    & .error_border:focus {
        border:1px solid #e55353;
        outline:1px solid #e55353;
    }

    & .normal_border + .icon{
        color:  #5bf995 ;
    }

    & .normal_border:focus + .icon{
        color:#0a640b;
    } 
`);

function CustomInputBox({name,placeholder,type,onChange,state,autoFocus,icon}) {
  return (
    <Box sx={{marginBottom:'20px'}}>
        <CustomInput props='red'>
            <input 
                id={name}
                name={name}
                type={type} 
                autoFocus={autoFocus}
                placeholder={placeholder} 
                onChange={(event => onChange(event))}
                className={(state.errorStatus[name] === true) ? "error_border" : "normal_border"}
            />
            {icon}
        </CustomInput>
        <span sx={{fontSize : "12px", marginLeft : "10px"}}><Typography sx={{marginTop : "5px",marginLeft : "10px",fontSize : "12px", color : "danger.main"}}>{state.errorFields[name]}</Typography></span>
    </Box>
  )
}

export default CustomInputBox