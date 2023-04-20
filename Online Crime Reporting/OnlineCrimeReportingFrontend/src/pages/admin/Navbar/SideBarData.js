import React from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as MdIcons from "react-icons/md";
import * as RiIcons from "react-icons/ri";

export const SidebarData = [
  {
    title: "*OCRS*",
    path: "/",
    icon: <AiIcons.AiFillHome />,
    cName: "nav-text",
  },
  {
    title: "DashBoard",
    path: "/api/admin/home",
    icon: <MdIcons.MdDashboard />,
    cName: "nav-text",
  },
  {
    title: "Police Station",
    path: "/api/admin/policestation/getall",
    icon: <MdIcons.MdLocalPolice />,
    cName: "nav-text",
  },
  {
    title: "Complaints",
    path: "/api/admin/complaints/getall",
    icon: <IoIcons.IoIosPaper />,
    cName: "nav-text",
  },
  {
    title: " Emergency Complaints",
    path: "/api/admin/emergrncycomplaint/getall",
    icon: <MdIcons.MdOutlineEmergency />,
    cName: "nav-text",
  },
  {
    title: "Criminal Records",
    path: "/api/admin/criminal/getall",
    icon: <RiIcons.RiCriminalFill />,
    cName: "nav-text",
  },
  {
    title: "Emergency Complaint Type",
    path: "/api/admin/emergencycomplaint/getemergencycomplaints",
    icon: <MdIcons.MdOutlineAutoAwesomeMotion />,
    cName: "nav-text",
  },
  {
    title: "Case Type",
    path: "/api/admin/casetype/casetypes",
    icon: <MdIcons.MdOutlineAutoAwesomeMotion />,
    cName: "nav-text",
  },
  {
    title: "Developers",
    path: "/home/about",
    icon: <IoIcons.IoMdHelpCircle />,
    cName: "nav-text",
  },
];
