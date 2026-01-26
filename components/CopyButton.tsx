import { useEffect, useState } from "react";

export const CopyButton = ({
  className,
  value,
}: {
  className?: string;
  value: string;
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (copied) setCopied(false);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [copied]);

  const handleCopy = (value: string) => {
    navigator.clipboard.writeText(value);
    setCopied(true);
  };

  return (
    <button onClick={() => handleCopy(value)}>
      {copied ? (
        <span className="material-icons text-green-600">check</span>
      ) : (
        <span className={`${className} material-symbols-outlined `}>
          content_copy
        </span>
      )}
    </button>
  );
};
