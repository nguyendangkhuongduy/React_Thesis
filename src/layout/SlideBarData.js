import React from "react";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";

export const SidebarData = [
    {
        title: "Trang chủ",
        path: "/home",
        icon: <AiIcons.AiFillHome />,
        cName: "nav-text",
        role: "ROLE_ADMIN ROLE_MANAGER ROLE_ASSOCIATE ROLE_STUDENT"
    },
    {
        title: "Quản lý người dùng",
        path: "/users",
        icon: <IoIcons.IoMdPeople />,
        cName: "nav-text",
        role: "ROLE_ADMIN"
    },
    {
        title: "Quản lý khoa",
        path: "/faculties",
        // icon: <IoIcons.IoIosPaper />,
        icon: <IoIcons.IoMdPie/>,
        cName: "nav-text",
        role: "ROLE_ADMIN"
    },
    {
        title: "Quản lý khóa luận",
        path: "/theses",
        // icon: <IoIcons.IoIosPaper />,
        icon: <IoIcons.IoMdWallet />,
        cName: "nav-text",
        role: "ROLE_MANAGER"

    },
    {
        title: "Quản lý hội đồng",
        path: "/council",
        // icon: <IoIcons.IoIosPaper />,
        icon: <IoIcons.IoIosBrowsers />,
        cName: "nav-text",
        role: "ROLE_MANAGER"

    },
    {
        title: "Quản lý tiêu chí",
        path: "/criteria",
        // icon: <IoIcons.IoIosPaper />,
        icon: <IoIcons.IoIosApps />,
        cName: "nav-text",
        role: "ROLE_MANAGER"

    },
    {
        title: "Quản lý điểm",
        path: "/score",
        // icon: <IoIcons.IoIosPaper />,
        icon: <IoIcons.IoMdPie/>,
        cName: "nav-text",
        role: "ROLE_ADMIN"
    },
    {
        title: "Khoá luận",
        path: "/theses_admin",
        // icon: <IoIcons.IoIosPaper />,
        icon: <IoIcons.IoMdPie/>,
        cName: "nav-text",
        role: "ROLE_ADMIN"
    },
    {
        title: "Hội đồng",
        path: "/council_admin",
        // icon: <IoIcons.IoIosPaper />,
        icon: <IoIcons.IoMdPie/>,
        cName: "nav-text",
        role: "ROLE_ADMIN"
    },
    {
        title: "Thống kê",
        path: "/statistic",
        // icon: <IoIcons.IoIosPaper />,
        icon: <IoIcons.IoMdPie/>,
        cName: "nav-text",
        role: "ROLE_ADMIN",
        roleGV: "ROLE_MANAGER"

    },
    {
        title: "Quản lý khóa luận",
        path: "/quanly/theses",
        // icon: <IoIcons.IoIosPaper />,
        icon: <IoIcons.IoMdBook />,
        cName: "nav-text",
        role: "ROLE_ASSOCIATE",

    },
    {
        title: "Khóa luận sinh viên",
        path: "/student/theses",
        // icon: <IoIcons.IoIosPaper />,
        icon: <IoIcons.IoMdPeople />,
        cName: "nav-text",
        role: "ROLE_STUDENT",

    },
    {
        title: "Liên hệ",
        path: "/contact",
        // icon: <IoIcons.IoIosPaper />,
        icon: <IoIcons.IoMdPeople />,
        cName: "nav-text",
        role: "ROLE_STUDENT",

    },
    {
        title: "Liên hệ",
        path: "/contact",
        // icon: <IoIcons.IoIosPaper />,
        icon: <IoIcons.IoMdPeople />,
        cName: "nav-text",
        role: "ROLE_MANAGER",

    },
   
    {
        title: "Quản lý hội đồng",
        path: "/quanly/council",
        // icon: <IoIcons.IoIosPaper />,
        icon: <IoIcons.IoMdPeople />,
        cName: "nav-text", 
        role: "ROLE_ASSOCIATE",

    },
    {
        title: "Liên hệ",
        path: "/contact",
        // icon: <IoIcons.IoIosPaper />,
        icon: <IoIcons.IoMdPeople />,
        cName: "nav-text",
        role: "ROLE_ASSOCIATE",

    },
];
