"use client";

import { useRouter } from "next/navigation";
import { usePrivy, User } from "@privy-io/react-auth";
import { useLogin } from "@privy-io/react-auth";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import { LogIn, Shield } from "lucide-react";

export function Login() {
    const router = useRouter()
    
    const { ready, authenticated, user } = usePrivy()

    const { login } = useLogin({
        onComplete: ( wasAlreadyAuthenticated ) => {
            console.log(wasAlreadyAuthenticated)
            setWasAuthenticated(wasAlreadyAuthenticated);        
        }
    })
    const [logging, setLogging] = useState<boolean>(false);
    const [wasAuthenticated, setWasAuthenticated] = useState<User | null>(null);

    useEffect(() => {
        if (logging && wasAuthenticated) {
            setLogging(false)
            //check if user has a profile 
            if (user?.customMetadata) {
                router.replace("/orders");
            } else {
                router.replace("/profile");
            }
            
        }
    }, [wasAuthenticated, logging, router, user?.customMetadata]);

    const Login = async () => {
        try {
            setLogging(true)

            if (!authenticated) {
                login()
            }
        } catch (error) {
            console.log(error)
        }
    }

    
    return (
        <div className="flex flex-col items-center space-y-4">
            <Button 
                disabled={!ready} 
                onClick={Login} 
                className="w-64 h-14 text-lg font-semibold bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 text-black shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 border-black hover:border-gray-800"
            >
                <div className="flex items-center space-x-3">
                    <Shield className="w-5 h-5" />
                    <span>Admin Login</span>
                    <LogIn className="w-5 h-5" />
                </div>
            </Button>
            <p className="text-sm text-gray-600 max-w-md text-center">
                Secure access to team management dashboard with enterprise-grade authentication
            </p>
        </div>
    );
}