import Link from "next/link";
import React from "react";

function Nav() {
  return (
    <nav
      style={{ backgroundColor: "purple", color: "white" }}
      className="flex items-center px-8 h-20"
    >
      <span style={{ fontWeight: "bold", fontSize: "28px" }}>Notes App</span>
      <div style={{ width: "10%", cursor: "pointer" }} className="mx-4">
        <ul className="flex justify-between">
          <li>
            <Link href="/contact">Contact</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Nav;
