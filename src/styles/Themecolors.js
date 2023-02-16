import { createTheme } from "@mui/material/styles";

const Colors = {
    // primary : "#057d86",
    // primary : "#30d5c8",
    primary : "#0a640b",
    
    secondary : "#53b983",
    success : "#a0cf6b",
    info : "#268DDD",
    danger : "#e55353",
    warning : "#f9a825",
    // dark : "#212121",
    light : "#f8fbfb",
    inputFieldColor :'#a0a1a1c7',
    inputFieldBorderColor: '#e2e4ee',
    // muted : "#757575",
    // border : "#9e9e9e",
    // inverse : "#616161",
    // shaft : "",
    // dove_gray : "",
    // body_bg : "",
    /////////////////
    //// solid colors 
    /////////////////
    white : "#fff",
    black : "#000",
}

const theme = createTheme({
    palette:{
        primary : {
            main : Colors.primary
        },
        secondary : { 
            main : Colors.secondary 
        },
        success : {
            main : Colors.success
        },
        danger : {
            main : Colors.danger
        },
        background: {
            paper: Colors.white,
            bgpaper : Colors.light
        },
        input : {
            font : Colors.inputFieldColor,
            border:Colors.inputFieldBorderColor
        }
    },
    components: {
        MuiButton: {
          defaultProps: {
            disableRipple: true,
            disableElevation:true
          },
        },
        MuiIconButton: {
            defaultProps: {
                disableRipple: true,
            },
        },
   
 
    },
 

    // zIndex: {
    //     drawer: 1200,
    //   }
    
    // below code represents the break points that can have intaed of xs(0), sm(600), md(900), lg(1200), xl(1536)
    // breakpoints : {
    //     values : {
    //         mobile : 0,
    //         tablet : 768,
    //         laptop : 1024,
    //         desktop : 1200
    //     }
    // }
});

export default theme;