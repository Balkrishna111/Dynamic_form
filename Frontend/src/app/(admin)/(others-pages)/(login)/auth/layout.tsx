import Link from "next/link";

// auth/layout.tsx
export default function Layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
    <Link href={"/auth/login"}>to modal</Link>
      {modal}
      {children}
    </>
  );
}
