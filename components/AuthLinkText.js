import Link from "next/link"

export default function AuthLinkText({ children, href }) {
  return (
    <Link
      href={href}>
      <span
        style={{
          display: "block",
          color: "blue",
          textDecoration: "underline",
          cursor: "pointer"
        }}>
        {children}
      </span>
    </Link>
  )
}