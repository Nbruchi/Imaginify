import {ReactNode} from "react";
import Sidebar from "@/components/shared/Sidebar";
import MobileNav from "@/components/shared/MobileNav";
import {Toaster} from "@/components/ui/toaster";

const RootLayout = ({children}:{children:ReactNode}) =>{
    return (
        <main className="root">
            <Sidebar/>
            <MobileNav/>
            <div className="root-container">
                <div className="wrapper">
                    {children}
                </div>
            </div>
            <Toaster />
        </main>
    )
}

export default RootLayout;
