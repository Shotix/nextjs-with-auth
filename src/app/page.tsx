"use client";

import LogoutButton from "@/app/components/ui/LogoutButton";

export default function Home() {

    return (
        <div className="main-container">
            <h1>You are logged in!</h1>
            <LogoutButton />
        </div>
    );
}
