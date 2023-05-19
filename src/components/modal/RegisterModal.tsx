import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from "@chakra-ui/react";
import RegisterForm from "../forms/RegisterForm";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSwitch: () => void;
}

const RegisterModal = ({ isOpen, onClose, onSwitch }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Register</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <RegisterForm onClose={onClose} onSwitch={onSwitch} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default RegisterModal;
