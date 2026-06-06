"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserDetailContext } from "@/context/UserDetailContext";

// Simple helpers to get/set cookies
function getCookie(name: string) {
  if (typeof document === 'undefined') return '';
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return decodeURIComponent(parts.pop()?.split(';').shift() || '');
  return '';
}

function setCookie(name: string, value: string, days = 365) {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
}

type User = {
  fullName: string | null;
  primaryEmailAddress: {
    emailAddress: string;
  } | null;
  imageUrl?: string;
};

type AuthContextType = {
  user: User | null;
  isSignedIn: boolean;
  isLoaded: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isSignedIn: true,
  isLoaded: false,
});

export function MockAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    let email = getCookie("mock_user_email");
    let name = getCookie("mock_user_name");

    // Automatically set default guest user if no cookies exist
    if (!email) {
      email = "developer@example.com";
      name = "AI Learner";
      setCookie("mock_user_email", email);
      setCookie("mock_user_name", name);
    }

    setUser({
      fullName: name,
      primaryEmailAddress: { emailAddress: email },
      imageUrl: "",
    });
    setIsLoaded(true);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isSignedIn: true, isLoaded }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useUser() {
  const { user, isSignedIn, isLoaded } = useContext(AuthContext);
  return { user, isSignedIn, isLoaded };
}

export function useAuth() {
  const { user, isSignedIn } = useContext(AuthContext);

  const has = (opts: { plan: string }) => {
    return true; // All features free
  };

  return {
    isSignedIn,
    userId: user?.primaryEmailAddress?.emailAddress || "developer@example.com",
    sessionId: "mock-session",
    has,
    signOut: async () => {},
  };
}

export function UserButton() {
  const { user } = useContext(AuthContext);
  if (!user) return null;

  const initials = user.fullName
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "D";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="outline-none">
        <Avatar className="h-10 w-10 border-2 border-black cursor-pointer hover:opacity-80 transition shadow-[2px_2px_0_0_#000]">
          <AvatarFallback className="font-game text-xl bg-yellow-400 text-black">
            {initials}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 font-game bg-zinc-850 text-white border-2 border-black mt-2">
        <DropdownMenuLabel className="font-game text-lg">My Account</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-zinc-700" />
        <div className="px-2 py-1.5">
          <p className="text-sm text-yellow-400">{user.fullName}</p>
          <p className="text-xs text-gray-400 truncate">{user.primaryEmailAddress?.emailAddress}</p>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
