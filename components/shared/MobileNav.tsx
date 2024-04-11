"use client";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SignIn, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import LOGO from "/public/assets/images/logo-text.png";
import MenuButton from "/public/assets/icons/menu.svg";
import { navLinks } from "@/constants";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { useState } from "react";

export default function MobileNav() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <header className="mobHeader justify-end">
      <Link
        href="/"
        className="flex justify-between items-center gap-2 md:py-2"
      >
        <Image
          src={LOGO}
          alt="logo"
          width={180}
          height={28}
          className="float-left"
        />
        <nav className="flex gap-2">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
            <Sheet open={isOpen} onOpenChange={() => setIsOpen(false)}>
              <SheetTrigger asChild onClick={() => setIsOpen(!isOpen)}>
                <Image
                  src={MenuButton}
                  alt="MenuButton"
                  height={32}
                  width={32}
                  className="cursor-pointer"
                />
              </SheetTrigger>
              <SheetContent
                onClick={handleClose}
                className="sheet-content sm:w-64"
              >
                <Image
                  src="/assets/images/logo-text.svg"
                  alt="logo"
                  width={152}
                  height={23}
                />
                <ul className="header-nav_elements">
                  {navLinks.map((link) => {
                    const isActive = link.route === pathname;
                    return (
                      <li
                        className={`${
                          isActive && "gradient-text"
                        } p-18 flex whitespace-nowrap text-dark-700`}
                        key={link.route}
                      >
                        <Link
                          className="sidebar-link cursor-pointer"
                          href={link.route}
                        >
                          <Image
                            src={link.icon}
                            alt="logo"
                            width={24}
                            height={24}
                          />
                          {link.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </SheetContent>
            </Sheet>
          </SignedIn>

          <SignedOut>
            <Button asChild className="button bg-purple-gradient bg-cover">
              <Link href="/sign-in">Login</Link>
            </Button>
          </SignedOut>
        </nav>
      </Link>
    </header>
  );
}
