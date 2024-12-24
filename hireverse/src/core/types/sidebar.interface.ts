import { MenuItemProps } from "@core/components/MenuItem";

export interface SidebarSection {
    name?: string;
    items: MenuItemProps[];
    divider?: boolean;
}
