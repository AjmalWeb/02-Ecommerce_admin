// import React from "react";
import * as FaIcons from "react-icons/fa";
import { AiOutlineTable ,AiFillSetting } from "react-icons/ai";
import { IoMdHelpCircle } from "react-icons/io";
import {
  RiTableAltLine,
  RiArrowDownSFill,
  RiArrowUpSFill,
} from "react-icons/ri";
import { RxDashboard } from "react-icons/rx";
import { GiChart } from "react-icons/gi";
import { HiOutlineTable, HiCube, HiOutlineUserCircle } from "react-icons/hi";
import { VscDebugStackframeDot } from "react-icons/vsc";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { FiUsers } from "react-icons/fi";



export const SidebarnewData = [
  {
    Header: "",
    Data: [
      {
        id: 1,
        title: "Dashboard",
        path: "/",
        icon: <RxDashboard />,
        isActive: false,
        subNav: [],
      },
    ],
  },
  {
    Header: "Product",
    Data: [
      {
        id: 2,
        title: "Products",
        // path: "/UIElements",
        icon: <MdOutlineProductionQuantityLimits />,
        iconClosed: <RiArrowDownSFill />,
        iconOpened: <RiArrowUpSFill />,
        isActive: false,
        subNav: [
          {
            title: "All products",
            path: "/Products",
            icon: <VscDebugStackframeDot />,
          },
          {
            title: "Add  Product",
            path: "/Products/new",
            icon: <VscDebugStackframeDot />,
          },
        ],
      },
    ],
  },
  {
    Header: "Users",
    Data: [
      {
        id: 3,
        title: "Users",
        // path: "/reports",
        icon: <FiUsers />,
        iconClosed: <RiArrowDownSFill />,
        iconOpened: <RiArrowUpSFill />,
        isActive: false,
        subNav: [
          {
            title: "All Users",
            path: "/Users",
            icon: <VscDebugStackframeDot />,
            cName: "sub-nav",
          },
          {
            title: "Add User",
            path: "/Users/new",
            icon: <VscDebugStackframeDot />,
            cName: "sub-nav",
          },
        ],
      },
    ],
  },
  {
    Header: "Settings",
    Data: [
      {
        id: 4,
        title: "Settings",
        // path: "/Pages/UserPages",
        icon: <AiFillSetting />,
        iconClosed: <RiArrowDownSFill />,
        iconOpened: <RiArrowUpSFill />,
        isActive: false,
        subNav: [
          {
            title: "User Management",
            path: "/Settings/user",
            icon: <VscDebugStackframeDot />,
          },
          {
            title: "Role Management",
            path: "/Settings/role",
            icon: <VscDebugStackframeDot />,
          },
          {
            title: "Category Management",
            path: "/Settings/Category",
            icon: <VscDebugStackframeDot />,
          },
        ],
      },
    ],
  },
  {
    Header: "Help",
    Data: [
      {
        id: 8,
        title: "Documentation",
        path: "/Documentation",
        icon: <IoMdHelpCircle />,
        isActive: false,
        subNav: [],
      },
    ],
  },
];
