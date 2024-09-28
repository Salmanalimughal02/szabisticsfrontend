import { Href } from "../../../utils/Constant";
export interface profilesMessageType {
  name: string;
  icon: "User" | "Mail" | "FileText" | "Settings" | "LogOut";
  link: string;
}

export const profilesMessage: profilesMessageType[] = [
  {
    name: "Account",
    icon: "User",
    link: `${process.env.PUBLIC_URL}/users/account`,
    // link: `${process.env.PUBLIC_URL}/users/usersprofile`
  },
  // {
  //     name: "Inbox",
  //     icon:"Mail",
  //     link: `${process.env.PUBLIC_URL}/email/emailapp`
  // },
  // {
  //     name: "Taskboard",
  //     icon:"FileText",
  //     link: `${process.env.PUBLIC_URL}/apps/task`
  // },
  {
    name: "Settings",
    icon: "Settings",
    link: `${process.env.PUBLIC_URL}/users/settings`,
  },
  {
    name: "Log Out",
    icon: "LogOut",
    link: `${process.env.PUBLIC_URL}/login`,
  },
];
