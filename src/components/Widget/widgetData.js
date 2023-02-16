import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

export const widgetData = [
	{
		title: "USERS",
		isMoney: false,
		link: "See all users",
		path: "/Users",
		amount:124,
		diff:20,
		icon: (
			<PersonOutlinedIcon
				style={{
					color: "crimson",
					backgroundColor: "rgba(255, 0, 0, 0.2)",
				}}
			/>
		),
	},
	{
		title: "ORDERS",
		isMoney: false,
		link: "View all orders",
		path: "/Orders",
		amount:20,
		diff:30,
		icon: (
			<ShoppingCartOutlinedIcon
				className="icon"
				style={{
					backgroundColor: "rgba(218, 165, 32, 0.2)",
					color: "goldenrod",
				}}
			/>
		),
	},
	{
		title: "EARNINGS",
		isMoney: true,
		link: "View net earnings",
		path: "/Earnings",
		amount:7400,
		diff:49,
		icon: (
			<MonetizationOnOutlinedIcon
				className="icon"
				style={{
					backgroundColor: "rgba(0, 128, 0, 0.2)",
					color: "green",
				}}
			/>
		),
	},
	{
		title: "BALANCE",
		isMoney: true,
		link: "See details",
		path: "/Balance",
		amount:3000,
		diff:-30,
		icon: (
			<AccountBalanceWalletOutlinedIcon
				className="icon"
				style={{
					backgroundColor: "rgba(128, 0, 128, 0.2)",
					color: "purple",
				}}
			/>
		),
	},
];

