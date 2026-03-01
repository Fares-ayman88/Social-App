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
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../../services/auth.service";
import { HiOutlineUserCircle, HiOutlineCog6Tooth, HiOutlineArrowRightOnRectangle } from "react-icons/hi2";

export default function Navbar() {
  const { userToken, clearUserToken, userId } = useContext(AuthContext);
  const navigate = useNavigate();

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

  return (
    <AppNavbar
      isBordered={false}
      maxWidth="xl"
      className="fixed inset-x-0 top-0 z-[70] bg-[rgba(239,246,255,0.68)] backdrop-blur-xl border-b border-[#cfddf5] shadow-[0_10px_28px_rgba(37,99,235,0.15)]"
    >
      <NavbarBrand className="gap-2 sm:gap-3">
        <Link to="/" className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-full bg-[linear-gradient(135deg,#2563eb_0%,#60a5fa_100%)] text-white font-extrabold text-sm shadow-[0_8px_20px_rgba(37,99,235,0.4)]">
            SA
          </span>
          <div className="leading-tight">
            <p className="font-bold text-[#0f1f3d] tracking-tight">Social App</p>
            <p className="text-[11px] text-[#60769a]">Share your world</p>
          </div>
        </Link>
      </NavbarBrand>

      {userToken && (
        <NavbarContent justify="center" className="hidden md:flex gap-2">
          <NavbarItem>
            <Button as={Link} to="/" variant="light" className="chip-button btn-quiet text-[#214885]">
              Home
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button
              as={Link}
              to={`/profile/${userId}`}
              variant="light"
              className="chip-button btn-quiet text-[#214885]"
            >
              Profile
            </Button>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} to="/settings" variant="light" className="chip-button btn-quiet text-[#214885]">
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
                <span className="hidden sm:block max-w-28 truncate text-sm font-semibold text-[#1a2d52]">
                  {avatarName}
                </span>
              </Button>
            </DropdownTrigger>

            <DropdownMenu aria-label="Profile Actions" variant="flat" className="min-w-52">
              <DropdownItem key="profile" className="h-14 gap-2" textValue="Signed in as">
                <p className="font-semibold">Signed in as</p>
                <p className="font-semibold text-[#1d4ed8]">{avatarEmail}</p>
              </DropdownItem>
              <DropdownItem
                key="user_profile"
                as={Link}
                to={`/profile/${userId}`}
                startContent={<HiOutlineUserCircle size={18} />}
              >
                My Profile
              </DropdownItem>
              <DropdownItem
                key="settings"
                as={Link}
                to="/settings"
                startContent={<HiOutlineCog6Tooth size={18} />}
              >
                Settings
              </DropdownItem>
              <DropdownItem
                key="logout"
                color="danger"
                onClick={handleLogout}
                startContent={<HiOutlineArrowRightOnRectangle size={18} />}
              >
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
                className="chip-button bg-[linear-gradient(135deg,#2563eb_0%,#1d4ed8_100%)] text-white border-0"
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
