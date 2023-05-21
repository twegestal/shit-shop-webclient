import { useEffect } from "react";

interface PollingServiceProps {
  interval: number;
  fetchNewMessages: () => void;
}

const PollingService = ({ interval, fetchNewMessages }: PollingServiceProps) => {
  useEffect(() => {
    const id = setInterval(fetchNewMessages, interval);
    return () => {
      clearInterval(id);
    };
  }, [interval, fetchNewMessages]);

  return null;
};

export default PollingService;
