import {
  Navbar as AppNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../../services/auth.service";
import { HiArrowLeft } from "react-icons/hi2";

export default function Navbar() {
  const { userToken, clearUserToken, userId } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const showBackButton = location.pathname !== "/";

  const { data: currentUserData } = useQuery({
    queryKey: ["current-user", userToken],
    queryFn: getCurrentUser,
    enabled: !!userToken,
  });

  const currentUser =
    currentUserData?.data?.user ||
    currentUserData?.user ||
    currentUserData?.data ||
    null;

  const avatarName = currentUser?.name || "User";
  const avatarEmail = currentUser?.email || "No email";
  const avatarPhoto =
    typeof currentUser?.photo === "string" && !currentUser.photo.includes("undefined")
      ? currentUser.photo
      : undefined;

  function handleLogout() {
    clearUserToken();
    navigate("/auth/login");
  }

  function handleGoBack() {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/");
  }

  return (
    <AppNavbar
      isBordered={false}
      shouldHideOnScroll
      maxWidth="xl"
      className="bg-[rgba(248,252,250,0.76)] backdrop-blur-md border-b border-[#d8e8e2] shadow-[0_8px_20px_rgba(16,42,35,0.06)]"
    >
      <NavbarBrand className="gap-2 sm:gap-3">
        {showBackButton && (
          <Button
            isIconOnly
            variant="light"
            aria-label="Go back"
            onPress={handleGoBack}
            className="chip-button btn-quiet size-9 min-w-9 text-[#1b463d]"
          >
            <HiArrowLeft size={18} />
          </Button>
        )}

        <Link to="/" className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-full bg-[linear-gradient(135deg,#0f766e_0%,#14b8a6_100%)] text-white font-extrabold text-sm shadow-[0_6px_18px_rgba(20,184,166,0.4)]">
            SA
          </span>
          <div className="leading-tight">
            <p className="font-bold text-[#0f2f2b] tracking-tight">Social App</p>
            <p className="text-[11px] text-[#5f756d]">Share your world</p>
          </div>
        </Link>
      </NavbarBrand>

      {userToken && (
        <NavbarContent justify="center" className="hidden md:flex gap-2">
          <NavbarItem>
            <Button as={Link} to="/" variant="light" className="chip-button btn-quiet text-[#1b463d]">
              Home
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              to={`/profile/${userId}`}
              variant="light"
              className="chip-button btn-quiet text-[#1b463d]"
            >
              Profile
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} to="/settings" variant="light" className="chip-button btn-quiet text-[#1b463d]">
              Settings
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}

      <NavbarContent justify="end">
        {userToken ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Button variant="light" className="chip-button btn-quiet min-w-0 px-2 py-6">
                <Avatar
                  isBordered
                  as="span"
                  className="transition-transform"
                  color="secondary"
                  name={avatarName}
                  size="sm"
                  src={avatarPhoto}
                />
                <span className="hidden sm:block max-w-28 truncate text-sm font-semibold text-[#16352e]">
                  {avatarName}
                </span>
              </Button>
            </DropdownTrigger>

            <DropdownMenu aria-label="Profile Actions" variant="flat" className="min-w-52">
              <DropdownItem key="profile" className="h-14 gap-2" textValue="Signed in as">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold text-[#115e59]">{avatarEmail}</p>
              </DropdownItem>
              <DropdownItem key="user_profile" as={Link} to={`/profile/${userId}`}>
                My Profile
              </DropdownItem>
              <DropdownItem key="settings" as={Link} to="/settings">
                Settings
              </DropdownItem>
              <DropdownItem key="logout" color="danger" onClick={handleLogout}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <>
            <NavbarItem>
              <Link className="inline-link font-semibold" to="/auth/login">
                Login
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button
                as={Link}
                to="/auth/register"
                className="chip-button bg-[linear-gradient(135deg,#0f766e_0%,#0f9f94_100%)] text-white border-0"
              >
                Sign Up
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </AppNavbar>
  );
}
