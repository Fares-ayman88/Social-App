import { Button } from "@heroui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { HiArrowLeft } from "react-icons/hi2";

export default function FloatingBackButton() {
  const navigate = useNavigate();
  const location = useLocation();

  if (location.pathname === "/") {
    return null;
  }

  function handleGoBack() {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/");
  }

  return (
    <Button
      isIconOnly
      variant="light"
      aria-label="Go back"
      onPress={handleGoBack}
      className="floating-back-button chip-button btn-quiet text-[#214885]"
    >
      <HiArrowLeft size={20} />
    </Button>
  );
}
