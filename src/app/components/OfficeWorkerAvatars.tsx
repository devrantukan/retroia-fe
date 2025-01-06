import Image from "next/image";

interface Member {
  id: string;
  name: string;
  avatarUrl?: string;
}

interface Props {
  members: Member[];
}

const OfficeWorkerAvatars = ({ members }: Props) => {
  const maxDisplay = 3;

  return (
    <div className="flex -space-x-3">
      {members?.slice(0, maxDisplay).map((member) => (
        <div
          key={member.id}
          className="rounded-full overflow-hidden w-10 h-10 border-2 border-gray-200"
        >
          <Image
            src={member.avatarUrl || "/default-avatar.png"}
            alt={member.name}
            width={40}
            height={40}
            className="object-cover"
          />
        </div>
      ))}
      {members?.length > maxDisplay && (
        <div className="w-10 h-10 rounded-full bg-gray-200 border-2 border-gray-200 flex items-center justify-center text-xs text-gray-600">
          +{members.length - maxDisplay}
        </div>
      )}
    </div>
  );
};

export default OfficeWorkerAvatars;
