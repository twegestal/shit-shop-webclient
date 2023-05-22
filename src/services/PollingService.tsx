import { useEffect } from "react";

interface Props {
  interval: number;
  fetchNewMessages: () => void;
}

const PollingService = ({ interval, fetchNewMessages }: Props) => {
  useEffect(() => {
    const id = setInterval(fetchNewMessages, interval);
    return () => {
      clearInterval(id);
    };
  }, [interval, fetchNewMessages]);

  return null;
};

export default PollingService;
