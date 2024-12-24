import { Box, List, Divider } from "@mui/material";
import MenuItem from "./MenuItem";
import AccountInfo from "./AccountInfo";
import { SidebarSection } from "@core/types/sidebar.interface";
import Logo from "./Logo";
import ScrollableContainer from "./ScrollableContainer";

interface SidebarProps {
    accountInfo: {
        name: string;
        email: string;
        profilePicture: string;
    };
    sections: SidebarSection[];
}

const Sidebar = ({ accountInfo, sections }: SidebarProps) => {
    return (
        <Box
            minWidth={250}
            height="100vh"
            bgcolor="#f7f7fd"
            display="flex"
            flexDirection="column"
        >
            {/* Logo Section*/}
            <Box p={2} flexShrink={0}>
                <Logo />
            </Box>

            {/* Sections */}
            <ScrollableContainer flexGrow={1} overflow={"auto"}>
                {sections.map((section, index) => (
                    <Box key={index}>
                        <List>
                            {section.items.map((item, idx) => (
                                <MenuItem key={idx} {...item} />
                            ))}
                        </List>
                        {section.divider && <Divider sx={{
                            height: '4px',
                            borderColor: 'secondary.main'
                        }}/>}
                    </Box>
                ))}
            </ScrollableContainer>

            {/* Account Info Section */}
            <Box
                paddingBlock={1}
                paddingInline={2}
                flexShrink={0}
                bgcolor="inherit"
                borderColor="divider"
            >
                <AccountInfo
                    name={accountInfo.name}
                    email={accountInfo.email}
                    profilePicture={accountInfo.profilePicture}
                />
            </Box>
        </Box>
    );
};

export default Sidebar;
