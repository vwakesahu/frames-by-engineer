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
    <div className='relative '>
      <Avatar className="cursor-pointer ">
        <AvatarImage
          src={user ? user.photoURL : "https://github.com/shadcn.png"}
          alt="@shadcn"
          onClick={login}
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>

      {isMenu && (
        <div className='absolute mt-3 right-3 top-7 cursor-pointer'>
          <div className='py-1 flex flex-col md:hidden space-y-3 pl-4 pr-2 bg-muted-foreground'>
            <Link href="/categories" >
              Getting started
            </Link>
            <Link href="#" >
              Components
            </Link>
            <Link href="#" >
              Documentation
            </Link>
          </div>
          <p onClick={logout} className='bg-white px-6 py-3 text-black rounded-md mt-4 text-center hover:font-bold transition-all duration-200'> Logout</p>
        </div>
      )}
    </div>
  );
}
