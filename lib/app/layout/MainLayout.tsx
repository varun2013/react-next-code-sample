import { Box } from "@chakra-ui/react";
import { PropsWithChildren } from "react";
import PublicLayout from "./public/Layout";

const Layout = ({ children }: PropsWithChildren) => {
    return (
        <Box>
            <PublicLayout>{children}</PublicLayout>
        </Box>
    );
};

export default Layout;