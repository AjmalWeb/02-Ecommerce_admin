import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import FactCheckOutlinedIcon from '@mui/icons-material/FactCheckOutlined';
import LiveHelpRoundedIcon from '@mui/icons-material/LiveHelpRounded';
import PowerSettingsNewRoundedIcon from '@mui/icons-material/PowerSettingsNewRounded';


export const profileData=[
    {
        id:1,
        title:'My Profile',
        icon:<PermIdentityOutlinedIcon sx={{color:'#1F3BB3'}}/>,
        path:'/profile'
    },
    {
        id:2,
        title:'Messages',
        icon:<MessageOutlinedIcon sx={{color:'#1F3BB3'}}/>
        ,path:'/messages'
    },
    {
        id:3,
        title:'Activity',
        icon:<FactCheckOutlinedIcon sx={{color:'#1F3BB3'}}/>,
        path:'/activity'
    },
    {
        id:4,
        title:'FAQ',
        icon:<LiveHelpRoundedIcon sx={{color:'#1F3BB3'}}/>,
        path:'/faq'
    },
    {
        id:5,
        title:'Sign out',
        icon:<PowerSettingsNewRoundedIcon sx={{color:'#1F3BB3'}}/>,
        path:'/signout',
    },

]