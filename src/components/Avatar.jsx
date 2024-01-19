import React,{ useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useStateValue } from "@/context/StateProvider";
import { app } from "../../firebase.config";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { actionType } from "@/context/reducer";
import Link from 'next/link';


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
    } else {
      setIsMenu(!isMenu);
    }
  };

  return (
    <div>
      <Avatar className="cursor-pointer ">
        <AvatarImage
          src={user ? user.photoURL : "https://github.com/shadcn.png"}
          alt="@shadcn"
          onClick={login}
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      {isMenu && (
        <div className='absolute md:hidden'>
          <div className='py-1'>
            <Link href="/categories">
              Getting started
            </Link>
            <p onClick={logout}> Logout</p>
            {/* <a href="#">
              Components
            </a>
            <a href="#">
              Documentation
            </a> */}
          </div>
        </div>
      )}
    </div>
  );
}
