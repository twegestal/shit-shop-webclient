import { Box, HStack, Icon } from "@chakra-ui/react";
import { VscAccount } from "react-icons/vsc";

const AccountIcon = () => {
  return (
    <HStack align="flex-start">
      <Box position="relative">
        <Icon as={VscAccount} boxSize={6} marginBottom={1} />
      </Box>
    </HStack>
  );
};

export default AccountIcon;
