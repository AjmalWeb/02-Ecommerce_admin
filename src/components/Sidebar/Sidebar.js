import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarnewData } from "./SidebarnewData";

import logo from "../../assets/images/logo.png";

const Nav = styled.div`
  // background: #fff;
  // background: red;
  // height: 80px;
  // display: flex;
  // justify-content: flex-start;
  // align-items: center;
  // margin:25px
  // justify-content: ${({ sidebar }) => (sidebar ? "center" : "flex-start")};
`;

const NavIcon = styled.div`
  background: #fff;
  // background: red;
  // margin-left: 2rem;
  font-size: 15px;
  height: 80px;
  display: flex;
  // justify-content: flex-start;
  cursor: pointer;
  gap: 25px;
  align-items: center;
  color: "#484848";
  justify-content: ${({ sidebar }) => (!sidebar ? "center" : "flex-start")};
  transition: all 250ms ease-in-out;
`;

const SidebarNav = styled.nav`
  font-family: "Manrope", sans-serif;
  font-weight: bold;
  // background: #15171c;
  position: relative;

  background: #fff;

  color: ${({ sidebar }) => !sidebar && "rgba(31, 59, 179, 0.7)"};
  width: ${({ sidebar }) => (sidebar ? "220px" : "80px")};
  height: 100%;
  display: flex;
  justify-content: center;

  padding-left: ${({ sidebar }) => (sidebar ? "27px" : "0px")};
  // z-index: 10;
  // overflow: ${({ sidebar }) => (sidebar ? "scroll" : "")};
  transition: all 250ms ease-in-out;
`;

const SidebarWrap = styled.div`
  transition: all 250ms ease-in-out;
  width: 100%;
`;

/////newly added
const Header = styled.div`
  color: #404040;
  padding: 5px;
  height: 25px;
  font-size: 13px;
  text-align: left;
  font-weight: 700;
  margin-top: 10px;
`;
const Marginside = styled.div`
  // margin-left: ${({ sidebar }) => (sidebar ? "27px" : "0px")};
  transition: all 250ms ease-in-out;
  // margin:25px;
`;
const SidebarLink = styled(Link)`
  display: flex;
  background: #fff;
  position: relative;

  color: ${({ sidebar }) => (sidebar ? "#484848" : "rgba(31, 59, 179, 0.7)")};
  // justify-content: space-between;
  justify-content: ${({ sidebar }) => (sidebar ? "space-between" : "center")};
  align-items: center;
  padding: 5px;
  list-style: none;
  height: 35px;
  text-decoration: none;

  font-size: ${({ sidebar }) => (sidebar ? "12px" : "15px")};
  line-height: 1;
  // color: ${({ sidebar }) =>
    sidebar ? "#484848" : "rgba(31, 59, 179, 0.7)"};
  // color:'red'
  cursor: pointer;

  &:hover {
    // background: #252831;
    border-left: 4px solid #632ce4;
    cursor: pointer;
    color: #632ce4;
  }

  & .subing {
    display: none;
    // background-color: #15171c;
    position: absolute;
    width: 125px;
    height: auto;
    left: 72px;
    // padding: 10px;
    padding-left: 5px;
    padding-bottom: 7px;
    list-style-type: disc;
    background-color: #fff;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
    box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
    z-index: 10001;
  }

  &:hover .subing {
    display: block;
  }

  // .subing &:hover{
  //   display: block;
  // }
  transition: all 250ms ease-in-out;
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
  cursor: pointer;
  // color: "yellow";
  // font-weight: 400;
  // &:hover {
  //   color: "rgba(31, 59, 179, 0.7)";
  // }
  transition: all 250ms ease-in-out;
`;

const DropdownLink = styled(Link)`
  background: ${({ sidebar }) => (sidebar ? "#fff" : "none")};

  height: 30px;
  padding-left: ${({ sidebar }) => (sidebar ? "2rem" : 0)};
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #484848;
  font-size: 12px;
  // padding-right: 3rem;
  font-weight: 400;
  transition: all 250ms ease-in-out;
  &:hover {
    color: #632ce4;
    cursor: pointer;
  }
`;

const Sidebar = ({ sidebar, showSidebar, hideSidebar }) => {
  const [sideData, setSideData] = useState(SidebarnewData);
  const showSubnav = (menu) => {
    // console.log({ menu });
    let newArray = sideData;
    let activesStatus = false;
    const new1 = newArray.map((item) => {
      return {
        ...item,
        Data: item.Data.map((data) => {
          if (data.id === menu) {
            activesStatus = !data.isActive;
          }
          return {
            ...data,
            isActive: data.id === menu ? activesStatus : false,
          };
        }),
      };
    });
    setSideData(new1);
    // console.log("new :::: ", new1);
  };
  // console.log(sideData);
  return (
      <SidebarNav sidebar={sidebar}>
       
        <SidebarWrap>
            {!sidebar ? (
              <NavIcon to="#">
                <FaIcons.FaBars onClick={showSidebar} />
              </NavIcon>
            ) : (
              <NavIcon to="#" sidebar={sidebar}>
                <AiIcons.AiOutlineClose onClick={showSidebar} />
                              <Link to="/">
                  <img src={logo} alt="BigC logo" style={{width:"124px",transition: "all 250ms ease-in-out"}}/>
                </Link>
              </NavIcon>
            )}

            {/* <NavIcon to='#'>
                <AiIcons.AiOutlineClose onClick={showSidebar} />
              </NavIcon> */}
            {/* {SidebarnewData.map((item, index) => {
                return <SubMenu item={item} key={index} side={sidebar} />;
              })} */}
            {sideData.map((item, index) => {
              return (
                <div key={index}>
                  <Marginside sidebar={sidebar}>
                    {sidebar && item.Header && item.Header.length > 0 && (
                      <Header>{item.Header.toUpperCase()}</Header>
                    )}
                    {item.Data &&
                      item.Data.length > 0 &&
                      item.Data.map((item, index) => {
                        return (
                          <div key={index}>
                            <SidebarLink
                              to={item.path && item.path}
                              sidebar={sidebar}
                              onClick={() =>
                                sidebar && item.subNav.length > 0
                                  ? showSubnav(item.id)
                                  : null
                              }
                            >
                              <div>
                                {item.icon}
                                {sidebar && (
                                  <SidebarLabel>{item.title}</SidebarLabel>
                                )}
                              </div>
                              {sidebar && (
                                <div>
                                  {item.subNav && item.isActive
                                    ? item.iconOpened
                                    : item.subNav
                                    ? item.iconClosed
                                    : null}
                                </div>
                              )}

                              {!sidebar && (
                                <div
                                  className="subing"
                                  // style={{backgroundColor: "green"}}
                                >
                                  <div
                                    style={{
                                      // backgroundColor: "white",
                                      padding: "10px 0 10px 0",

                                      textAlign: "left",
                                      // color: "#404040",
                                    }}
                                  >
                                    {item.title}
                                  </div>

                                  {item.subNav.map((item, index) => {
                                    return (
                                      <DropdownLink
                                        sidebar={sidebar}
                                        to={item.path}
                                        key={index}

                                        // sx={{ background: "transparent",borderRadius:'5px'}}
                                      >
                                        {item.icon}
                                        <SidebarLabel>
                                          {item.title}
                                        </SidebarLabel>
                                      </DropdownLink>
                                    );
                                  })}
                                </div>
                              )}
                            </SidebarLink>
                            {item.isActive &&
                              sidebar &&
                              item.subNav.map((item, index) => {
                                return (
                                  <DropdownLink
                                    sidebar={sidebar}
                                    to={item.path}
                                    key={index}
                                    onClick={showSidebar}
                                  >
                                    {item.icon}
                                    <SidebarLabel>{item.title}</SidebarLabel>
                                  </DropdownLink>
                                );
                              })}
                          </div>
                        );
                      })}

                    {/* <Over>
  {item.subNav  &&
  !side &&
  item.subNav.map((item, index) => {
  return (  
  <h4>{item.icon}{item.title}</h4>  
  );
  })}</Over> */}
                  </Marginside>
                </div>
              );
            })}
          </SidebarWrap>
       
          
        
      </SidebarNav>
  );
};

export default Sidebar;
