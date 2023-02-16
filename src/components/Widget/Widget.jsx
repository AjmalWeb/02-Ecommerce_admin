import styled from "styled-components";
import { Link } from "react-router-dom";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const WidgetDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex: 1;
  padding: 10px;
  -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
  box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
  border-radius: 10px;
  height: 100px;

  .left,
  .right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .title {
      font-weight: bold;
      font-size: 14px;
      color: rgb(160, 160, 160);
    }

    .counter {
      font-size: 28px;
      font-weight: 300;
    }
    .percentage {
      display: flex;
      align-items: center;
      font-size: 14px;

      &.positive {
        color: green;
      }
      &.negative {
        color: red;
      }
    }

    .icon {
      font-size: 18px;
      padding: 5px;
      border-radius: 5px;
      align-self: flex-end;
    }
  }
`;

const WidgetLink = styled(Link)`
  width: max-content;
  font-size: 12px;
  border-bottom: 1px solid gray;
  text-decoration: none;

  &:hover {
    cursor: pointer;
    color: #632ce4;
  }
  cursor: pointer;
`;
const Widget = ({ item }) => {
  // let data;

  // //temporary
  // const amount = 100;
  // const diff = 20;

  // switch (type) {
  //   case "user":
  //     data = {
  //       title: "USERS",
  //       isMoney: false,
  //       link: "See all users",
  //       path: "/Users",
  //       icon: (
  //         <PersonOutlinedIcon
  //           className="icon"
  //           style={{
  //             color: "crimson",
  //             backgroundColor: "rgba(255, 0, 0, 0.2)",
  //           }}
  //         />
  //       ),
  //     };
  //     break;
  //   case "order":
  //     data = {
  //       title: "ORDERS",
  //       isMoney: false,
  //       link: "View all orders",
  //       path: "/Orders",
  //       icon: (
  //         <ShoppingCartOutlinedIcon
  //           className="icon"
  //           style={{
  //             backgroundColor: "rgba(218, 165, 32, 0.2)",
  //             color: "goldenrod",
  //           }}
  //         />
  //       ),
  //     };
  //     break;
  //   case "earning":
  //     data = {
  //       title: "EARNINGS",
  //       isMoney: true,
  //       link: "View net earnings",
  //       path: "/Earnings",
  //       icon: (
  //         <MonetizationOnOutlinedIcon
  //           className="icon"
  //           style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
  //         />
  //       ),
  //     };
  //     break;
  //   case "balance":
  //     data = {
  //       title: "BALANCE",
  //       isMoney: true,
  //       link: "See details",
  //       path: "/Balance",
  //       icon: (
  //         <AccountBalanceWalletOutlinedIcon
  //           className="icon"
  //           style={{
  //             backgroundColor: "rgba(128, 0, 128, 0.2)",
  //             color: "purple",
  //           }}
  //         />
  //       ),
  //     };
  //     break;
  //   default:
  //     break;
  // }

  return (
    <WidgetDiv>
      <div className="left">
        <span className="title">{item.title}</span>
        <span className="counter">
          {item.isMoney && "$"} {item.amount}
        </span>
        {/* <span className="link">{data.link}</span> */}
        <WidgetLink to={item.path}>{item.link}</WidgetLink>
      </div>
      <div className="right">
        <div
          className={
            item.diff > 0 ? "percentage positive" : "percentage negative"
          }
        >
          <KeyboardArrowUpIcon />
          {item.diff} %
        </div>
        {item.icon}
      </div>
    </WidgetDiv>
  );
};

export default Widget;
