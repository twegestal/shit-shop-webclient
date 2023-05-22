import { useState } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  VStack,
  Text,
} from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import { BsClockHistory } from "react-icons/bs";
import { AiOutlineNotification } from "react-icons/ai";
import AccountIcon from "../icons/AccountIcon";
import { MdPending, MdOutlinePending } from "react-icons/md";
import ProductSubscriptionsModal from "../modal/ProductSubscriptionModal";
import OrderHistoryModal from "../modal/OrderHistoryModal";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSignOut: () => void;
}

const AccountMenu = ({ isOpen, onClose, onSignOut }: Props) => {
  const [isProductSubscriptionsOpen, setProductSubscriptionsOpen] =
    useState(false);
  const [isOrderHistoryOpen, setOrderHistoryOpen] = useState(false);

  const handleProductSubscriptionsClick = () => {
    setProductSubscriptionsOpen(true);
  };

  const handleProductSubscriptionsClose = () => {
    setProductSubscriptionsOpen(false);
  };

  const handleOrderHistoryClick = () => {
    setOrderHistoryOpen(true);
  };

  const handleOrderHistoryClose = () => {
    setOrderHistoryOpen(false);
  };

  return (
    <>
      <Menu isOpen={isOpen} onClose={onClose}>
        <MenuButton as={VStack} _hover={{ cursor: "pointer" }}>
          <AccountIcon />
        </MenuButton>
        <MenuList>
          <MenuItem onClick={handleOrderHistoryClick}>
            <BsClockHistory style={{ marginRight: "8px" }} />
            Order history
          </MenuItem>
          <MenuItem>
            <MdPending style={{ marginRight: "8px" }} />
            Pending purchases
          </MenuItem>
          <MenuItem>
            <MdOutlinePending style={{ marginRight: "8px" }} />
            Pending sales
          </MenuItem>
          <MenuItem onClick={handleProductSubscriptionsClick}>
            <AiOutlineNotification style={{ marginRight: "8px" }} />
            Subscribe to product type
          </MenuItem>
          <MenuItem onClick={onSignOut}>
            <FiLogOut />
            <Text ml={2}>Sign Out</Text>
          </MenuItem>
        </MenuList>
      </Menu>
      <ProductSubscriptionsModal
        isOpen={isProductSubscriptionsOpen}
        onClose={handleProductSubscriptionsClose}
      />
      <OrderHistoryModal
        isOpen={isOrderHistoryOpen}
        onClose={handleOrderHistoryClose}
      />
    </>
  );
};

export default AccountMenu;
