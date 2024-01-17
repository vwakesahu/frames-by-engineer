import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useStateValue } from "@/context/StateProvider";
import { app } from "../../firebase.config";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { actionType } from "@/context/reducer";
import { useState } from "react";

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
      <Avatar className="cursor-pointer">
        <AvatarImage
          src={user ? user.photoURL : "https://github.com/shadcn.png"}
          alt="@shadcn"
          onClick={login}
        />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      {isMenu && <div onClick={logout}>Logout</div>}
    </div>
  );
}
