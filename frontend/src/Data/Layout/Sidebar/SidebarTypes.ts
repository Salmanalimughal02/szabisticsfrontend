interface SubMenu2 {
  title: string;
  link: string;
  bookmark?: boolean;
  type?: string;
}
interface SubMenu1 {
  title: string;
  link?: string;
  subMenu?: SubMenu2[];
  bookmark?: boolean;
  type?: string;
}
export interface SubMenu {
  svgIcon?: string;
  title: string;
  link?: string;
}

export interface SidebarMenuTypes {
  title: string;
  svgIcon?: string;
  link?: string;
  role?: string[];
  subMenu?: SubMenu[];
}
