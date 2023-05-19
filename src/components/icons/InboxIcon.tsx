import { HStack, Badge, Box, Icon } from "@chakra-ui/react";
import { MdOutlineNotificationsNone } from "react-icons/md";

interface Props {
  messageCount: number;
}

const InboxIcon = ({ messageCount }: Props) => {
  return (
    <HStack align="flex-start">
      <Box position="relative">
        <Icon as={MdOutlineNotificationsNone} boxSize={6} marginBottom={1} />
        {messageCount > 0 && (
          <Badge
            colorScheme="green"
            borderRadius="full"
            size="sm"
            position="absolute"
            top="-2px"
            right="-2px"
            fontSize="xs"
          >
            {messageCount}
          </Badge>
        )}
      </Box>
    </HStack>
  );
};

export default InboxIcon;
