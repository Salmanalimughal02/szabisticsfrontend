import Store from "../../../ReaduxToolkit/Store";
import { SidebarMenuTypes } from "./SidebarTypes";

export const SidebarMenu: SidebarMenuTypes[] = [
  {
    title: "Dashboard",
    svgIcon: "home",
    link: `${process.env.PUBLIC_URL}/dashboards/shoppingplace`,
    // subMenu: [
    //   {
    //     svgIcon: "bonus-kit",
    //     title: "Shopping Place",
    //     link: `${process.env.PUBLIC_URL}/dashboards/shoppingplace`,
    //   },
    //   {
    //     svgIcon: "bonus-kit",
    //     title: "CRM Dashboard",
    //     link: `${process.env.PUBLIC_URL}/dashboards/crmdashboard`,
    //   },
    // ],
  },
  {
    title: "Setup",
    svgIcon: "layout",
    subMenu: [
      {
        svgIcon: "bonus-kit",
        title: "Country",
        link: `${process.env.PUBLIC_URL}/setup/countries`,
      },
      {
        svgIcon: "bonus-kit",
        title: "Province",
        link: `${process.env.PUBLIC_URL}/setup/province`,
      },
      {
        svgIcon: "bonus-kit",
        title: "City",
        link: `${process.env.PUBLIC_URL}/setup/cities`,
      },
      {
        svgIcon: "bonus-kit",
        title: "Package",
        link: `${process.env.PUBLIC_URL}/setup/package`,
      },
      {
        svgIcon: "bonus-kit",
        title: "CRM Modules",
        link: `${process.env.PUBLIC_URL}/setup/crm_module`,
      },
      {
        svgIcon: "bonus-kit",
        title: "Email Templates",
        link: `${process.env.PUBLIC_URL}/dashboards/crmdashboard`,
      },
      {
        svgIcon: "bonus-kit",
        title: "WhatsApp templates",
        link: `${process.env.PUBLIC_URL}/dashboards/crmdashboard`,
      },
      {
        svgIcon: "bonus-kit",
        title: "Server Details",
        link: `${process.env.PUBLIC_URL}/setup/server_details`,
      },
      {
        svgIcon: "bonus-kit",
        title: "Server Management",
        link: `${process.env.PUBLIC_URL}/setup/server_management`,
      },
    ],
  },
  {
    title: "Modules",
    svgIcon: "home",
    subMenu: [
      {
        svgIcon: "bonus-kit",
        title: "Module 1",
        link: `${process.env.PUBLIC_URL}/dashboards/shoppingplace`,
      },
      {
        svgIcon: "bonus-kit",
        title: "Module 2",
        link: `${process.env.PUBLIC_URL}/dashboards/shoppingplace`,
      },
    ],
  },

  // {
  //   title: "Modules",
  //   svgIcon: "home",
  //   subMenu: ,
  // },

  {
    title: "Companies",
    svgIcon: "home",
    link: `${process.env.PUBLIC_URL}/companies`,
    // subMenu: [
    //   {
    //     svgIcon: "bonus-kit",
    //     title: "All Companies",
    //     link: `${process.env.PUBLIC_URL}/dashboards/shoppingplace`,
    //   },
    // ],
  },
  {
    title: "Support",
    svgIcon: "home",
    link: `${process.env.PUBLIC_URL}/support`,
    // subMenu: [
    //   {
    //     svgIcon: "bonus-kit",
    //     title: "Support",
    //     link: `${process.env.PUBLIC_URL}/support`,
    //   },
    // ],
  },
  {
    title: "Tasks",
    svgIcon: "home",
    link: `${process.env.PUBLIC_URL}/tasks`,
    // subMenu: [
    //   {
    //     svgIcon: "bonus-kit",
    //     title: "Tasks",
    //     link: `${process.env.PUBLIC_URL}/tasks`,
    //   },
    // ],
  },
];

export const CompanySidebarMenu: SidebarMenuTypes[] = [
  {
    title: "Dashboard",
    svgIcon: "home",
    link: `${process.env.PUBLIC_URL}/company/dashboard`,
  },
  {
    title: "Setup",
    svgIcon: "home",
    subMenu: [
      {
        svgIcon: "bonus-kit",
        title: "Roles",
        link: `${process.env.PUBLIC_URL}/company/roles`,
      },
      {
        svgIcon: "bonus-kit",
        title: "Email Templates",
        link: `${process.env.PUBLIC_URL}/company/emailTemplates`,
      },
      {
        svgIcon: "bonus-kit",
        title: "WhatsApp templates",
        link: `${process.env.PUBLIC_URL}/company/whatsappTemplates`,
      },
    ],
  },
  {
    title: "Modules",
    svgIcon: "home",
    subMenu: [
      {
        svgIcon: "bonus-kit",
        title: "Monitoring",
        link: `${process.env.PUBLIC_URL}/company/modules/monitoring`,
      },
      {
        svgIcon: "bonus-kit",
        title: "Control Room",
        link: `${process.env.PUBLIC_URL}/company/modules/controlRoom`,
      },
    ],
  },

  {
    title: "Users",
    svgIcon: "home",
    link: `${process.env.PUBLIC_URL}/company/users`,
  },
  {
    title: "Support",
    svgIcon: "home",
    link: `${process.env.PUBLIC_URL}/company/support`,
  },
  {
    title: "Tasks",
    svgIcon: "home",
    link: `${process.env.PUBLIC_URL}/company/tasks`,
  },
];
