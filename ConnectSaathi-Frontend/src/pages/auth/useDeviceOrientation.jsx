import { useState, useEffect } from "react";

export default function useDeviceOrientation() {
  const getOrientation = () =>
    window.innerWidth > window.innerHeight ? "landscape" : "portrait";
  const getDevice = () =>
    window.innerWidth < 900 ? "mobile" : "desktop";

  const [orientation, setOrientation] = useState(getOrientation());
  const [device, setDevice] = useState(getDevice());

  useEffect(() => {
    const handler = () => {
      setOrientation(getOrientation());
      setDevice(getDevice());
    };
    window.addEventListener("resize", handler);
    window.addEventListener("orientationchange", handler);
    return () => {
      window.removeEventListener("resize", handler);
      window.removeEventListener("orientationchange", handler);
    };
  }, []);
  return { orientation, device };
}
