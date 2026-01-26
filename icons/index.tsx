export const CheckCircleIcon = ({
  className,
  color = "#5E5F6E",
}: {
  className: string;
  color?: string;
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.3"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 1.25C6.06294 1.25 1.25 6.06294 1.25 12C1.25 17.9371 6.06294 22.75 12 22.75C17.9371 22.75 22.75 17.9371 22.75 12C22.75 6.06294 17.9371 1.25 12 1.25Z"
        fill={color}
      />
      <path
        d="M9 13L11 15L15 11"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const DangerIcon = ({
  className,
  color = "#5E5F6E",
}: {
  className: string;
  color?: string;
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.3"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.9019 2.41547C12.3065 2.2964 11.6935 2.2964 11.0981 2.41547C9.77522 2.68006 8.63523 3.5122 7.98005 4.69153L1.79413 15.8262C1.43727 16.4685 1.25 17.1912 1.25 17.926C1.25 20.3141 3.18588 22.25 5.57391 22.25H18.4261C20.8141 22.25 22.75 20.3141 22.75 17.926C22.75 17.1912 22.5627 16.4685 22.2059 15.8262L16.02 4.69153C15.3648 3.5122 14.2248 2.68006 12.9019 2.41547Z"
        fill={color}
      />
      <path
        d="M12 9L12 13"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 16L12 16.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
export const LoadingIcon = ({
  className,
  color = "#5E5F6E",
}: {
  className: string;
  color?: string;
}) => {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="0.3"
        d="M12 2L12 5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.3"
        d="M12 19L12 22"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.3"
        d="M22 12L19 12"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        opacity="0.3"
        d="M5 12L2 12"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.071 4.92897L16.9497 7.05029"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.05003 16.95L4.92871 19.0713"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.92897 4.92897L7.05029 7.05029"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.9495 16.95L19.0708 19.0713"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
