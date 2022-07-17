import { cls } from "../libs/client/utils";

interface MessageProps {
  message: string;
  reversed?: boolean;
  avatarUrl?: string;
}

export default function Message({
  message,
  reversed,
  avatarUrl,
}: MessageProps) {
  return (
    <div
      className={cls(
        "flex items-start",
        reversed ? "flex-row-reverse space-x-reverse space-x-2" : "space-x-2"
      )}
    >
      <div className="w-8 h-8 rounded-full bg-gray-500" />
      <div className="w-1/2 text-sm text-gray-700 p-2 border rounded-md border-gray-300">
        <p>{message}</p>
      </div>
    </div>
  );
}
