import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Box,
} from "@chakra-ui/react";

interface Props {
  status: "success" | "error" | "warning" | "info";
  title: string;
  description: string;
  onClose: () => void;
}

const AlertMessage = ({ status, title, description, onClose }: Props) => {
  return (
    <Alert status={status} variant="subtle" borderRadius="md">
      <AlertIcon as={Box} boxSize={6} />
      <Box flex="1">
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Box>
      <CloseButton
        position="absolute"
        right="8px"
        top="8px"
        onClick={onClose}
      />
    </Alert>
  );
};

export default AlertMessage;
