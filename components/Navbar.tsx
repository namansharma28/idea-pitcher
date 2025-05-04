

import Link from "next/link";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth";
import { BadgePlus, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = async () => {
  const session = await auth();

  return (
    <header className="navbar-header">
      <nav className="navbar-nav">
        <Link href="/">
          <Image src="/logo.png" alt="logo" width={144} height={30} />
        </Link>

        <div className="navbar-actions">
          {session && session?.user ? (
            <>
              <Link href="/startup/create">
                <span className="max-sm:hidden navbar-create-text">Create</span>
                <BadgePlus className="size-6 sm:hidden navbar-create-icon" />
              </Link>

              <form
                action={async () => {
                  "use server";

                  await signOut({ redirectTo: "/" });
                }}
              >
                <button type="submit" className="navbar-logout-btn">
                  <span className="navbar-logout-text">Logout</span>
                  <LogOut className="navbar-logout-icon" />
                </button>
              </form>

              <Link href={`/user/${session?.id}`}>
                <Avatar className="size-10">
                  <AvatarImage
                    src={session?.user?.image || ""}
                    alt={session?.user?.name || ""}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <form
              action={async () => {
                "use server";

                await signIn("github");
              }}
            >
              <button className="navbar-login-btn" type="submit">Login</button>            
            </form>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;