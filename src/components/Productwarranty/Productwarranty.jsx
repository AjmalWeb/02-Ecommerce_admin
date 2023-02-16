import VerifiedIcon from "@mui/icons-material/Verified";
import { Box, Typography, Button } from "@mui/material";
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import SafetyCheckIcon from '@mui/icons-material/SafetyCheck';




const Warranty=[
{
	icon:<VerifiedIcon sx={{ width: "36px", height: "36px" }}/>,
	title:'100% Original',
	para:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua.'
},
{
	icon:<AccessTimeFilledIcon sx={{ width: "36px", height: "36px" }}/>,
	title:'10 Day Replacement',
	para:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua.'
}
,{
	icon:<SafetyCheckIcon sx={{ width: "36px", height: "36px" }}/>,
	title:'100% Original',
	para:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed doeiusmod tempor incididunt ut labore et dolore magna aliqua.'
}
]




const Productwarranty = () => {
	return (
		<Box sx={{display:'flex',gap:'30px',}}>
		{Warranty.map((item,index)=>(
			<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				marginTop: "80px",
				marginBottom: "80px",
				justifyContent:'center',alignItems:'center'
			}}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					width: "64px",
					height: "64px",
					borderRadius: "50%",
					color: "rgb(0, 171, 85)",
					backgroundColor: "rgba(0, 171, 85, 0.08)",
				}}
			>
				{item.icon}
			</Box>
			<Typography
				variant="h6"
				sx={{ margin: "24px 0px 8px", fontWeight: "700" }}
			>
				{item.title}
			</Typography>
			<Typography
				variant="subtitle1"
				sx={{
					lineHeight: "1.5",
					fontSize: "1rem",
					fontFamily: "Public Sans, sans-serif",
					fontWeight: "400",
					color: "rgb(99, 115, 129)",
					textAlign:'center'
				}}
			>
				{item.para}
			</Typography>
		</Box>	


			))}

		</Box>
	);
};

export default Productwarranty;
