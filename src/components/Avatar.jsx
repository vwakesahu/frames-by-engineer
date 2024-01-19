import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useStateValue } from "@/context/StateProvider";
import { app } from "../../firebase.config";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { actionType } from "@/context/reducer";
import Link from "next/link";

export function AvatarComp() {
  const [{ user }, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState(false);

  const logout = () => {
    setIsMenu(false);
    localStorage.clear();

    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };

  // useEffect(() => {
  //   logout();
  // }, []);

  const login = async () => {
    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("user", JSON.stringify(providerData[0]));
      console.log(providerData[0]);
    } else {
      console.log("here");
      setIsMenu(!isMenu);
    }
  };

  return (
    <div className="relative ">
      <Avatar className="cursor-pointer ">
        <AvatarImage
          src={user ? user?.photoURL : "https://github.com/shadcn.png"}
          alt="@shadcn"
          onClick={login}
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      {isMenu && (
        <div className="absolute mt-3 right-2 top-10 md:top-11 cursor-pointer bg-muted border-foreground rounded-lg">
          <div className="flex flex-col md:hidden space-y-3">
            <Link href="/categories" className="rounded-t-lg px-6 py-3 hover:bg-muted-foreground">Getting started</Link>
            <Link href="#" className="px-6 py-3 hover:bg-muted-foreground">Components</Link>
            <Link href="#" className="px-6 py-3 hover:bg-muted-foreground">Documentation</Link>
          </div>
          <p
            onClick={logout}
            className="px-6 py-3 rounded-b-lg md:rounded-lg hover:bg-red-400 hover:text-foreground md:mt-0 text-center transition-all text-destructive bg-red-300 duration-200"
          >
            Logout
          </p>
        </div>
      )}
    </div>
  );
}
