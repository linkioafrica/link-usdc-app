import { CheckCircleIcon, DangerIcon } from "@/icons";
import { cn } from "@/lib/utils";

interface FormStatusProps {
  message?: string;
  className?: string;
}

export const FormError = ({ message, className }: FormStatusProps) => {
  if (!message) return null;

  return (
    <div
      className={cn(
        "bg-rose-100 p-2 absolute bottom-28 rounded-md flex gap-2 items-center text-sm text-rose-500",
        className ? className : "w-80"
      )}
    >
      <DangerIcon className="h-5 w-5 col-span-1" color="#F25C63" />
      <p className="col-span-5">{message}</p>
    </div>
  );
};

export const FormSuccess = ({ message, className }: FormStatusProps) => {
  if (!message) return null;

  return (
    <div
      className={cn(
        "bg-emerald-100 p-2 absolute bottom-28 rounded-md flex items-center gap-x-2 text-sm text-emerald-500",
        className ? className : "w-80"
      )}
    >
      <CheckCircleIcon className="h-5 w-5" color="rgb(16 185 129)" />
      <p>{message}</p>
    </div>
  );
};
