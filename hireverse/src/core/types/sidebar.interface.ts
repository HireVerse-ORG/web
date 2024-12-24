import { MenuItemProps } from "@core/components/ui/MenuItem";

export interface SidebarSection {
    name?: string;
    items: MenuItemProps[];
    divider?: boolean;
}
