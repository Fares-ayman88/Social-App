import { Button, Avatar, Input } from "@heroui/react";
import { HiOutlineUserPlus, HiOutlineUserGroup } from "react-icons/hi2";
import defaultPhoto from "../../../assets/avatar-gender-neutral-silhouette-vector-600nw-2470054311.webp";

const suggestedFriends = [
  { id: 1, name: "Ahmed Abd Al-Mu", handle: "@ahmedmutti", followers: 118, mutual: 1 },
  { id: 2, name: "Ahmed Bahnasy", handle: "@bahnasy20222w2", followers: 95, mutual: 1 },
  { id: 3, name: "mohamed", handle: "route user", followers: 48, mutual: 1 },
  { id: 4, name: "Aya", handle: "route user", followers: 40, mutual: 1 },
  { id: 5, name: "mohamed", handle: "route user", followers: 36, mutual: 1 },
];

export default function RightSidebar() {
  return (
    <aside className="sidebar-wrap" style={{ position: "sticky", top: "5.4rem", alignSelf: "start" }}>
      <div className="surface-card sidebar-card p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#1a2d52]">
            <HiOutlineUserGroup size={20} className="text-[#2563eb]" />
            <h3 className="text-xl font-semibold">Suggested Friends</h3>
          </div>
          <span className="rounded-full bg-[#e8efff] px-2 py-0.5 text-sm font-semibold text-[#5a7091]">
            {suggestedFriends.length}
          </span>
        </div>

        <Input
          type="text"
          placeholder="Search friends..."
          variant="bordered"
          classNames={{
            inputWrapper:
              "bg-[rgba(255,255,255,0.6)] border border-[#d2e0fb] rounded-xl data-[hover=true]:border-[#bfd3fb]",
          }}
        />

        <div className="mt-4 flex flex-col gap-3">
          {suggestedFriends.map((friend) => (
            <article key={friend.id} className="sidebar-friend-card">
              <div className="flex items-start gap-3">
                <Avatar size="md" src={defaultPhoto} name={friend.name} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-lg font-semibold text-[#1a2d52]">{friend.name}</p>
                  <p className="truncate text-base text-[#6f82a5]">{friend.handle}</p>
                </div>
                <Button
                  size="sm"
                  className="chip-button border border-[#c8d9fb] bg-[#e6efff] font-semibold text-[#2a5ad2]"
                  startContent={<HiOutlineUserPlus size={16} />}
                >
                  Follow
                </Button>
              </div>
              <div className="mt-3 flex gap-2 text-sm">
                <span className="rounded-full bg-[#edf3ff] px-3 py-1 text-[#5f77a0]">{friend.followers} followers</span>
                <span className="rounded-full bg-[#eaf2ff] px-3 py-1 text-[#2a5ad2]">{friend.mutual} mutual</span>
              </div>
            </article>
          ))}
        </div>

        <Button variant="light" className="mt-4 w-full rounded-xl border border-[#d3e1fb] bg-[rgba(255,255,255,0.62)] text-[#39527c]">
          View more
        </Button>
      </div>
    </aside>
  );
}
