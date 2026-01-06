type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
};

export default function Button({ children, href, onClick }: ButtonProps) {
  const classes =
    "inline-block rounded-xl bg-black px-6 py-3 text-white font-semibold hover:bg-gray-800 transition";

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
