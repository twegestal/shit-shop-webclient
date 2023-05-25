import { HStack, Badge, Box, Icon, Text } from "@chakra-ui/react";
import { MdOutlineNotificationsNone } from "react-icons/md";

interface Props {
  hasUnsentMessages: boolean;
}

const InboxIcon = ({ hasUnsentMessages }: Props) => {
  return (
    <HStack align="flex-start">
      <Box position="relative">
        <Icon as={MdOutlineNotificationsNone} boxSize={6} marginBottom={1} />
        {hasUnsentMessages && (
          <Badge
            colorScheme="red"
            borderRadius="full"
            size="sm"
            position="absolute"
            top="-2px"
            right="-2px"
          >
            <Text fontSize="xs" fontWeight="bold" color="white">
              !
            </Text>
          </Badge>
        )}
      </Box>
    </HStack>
  );
};

export default InboxIcon;
