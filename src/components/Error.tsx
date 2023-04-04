import React from "react";
import { setPage } from "../interfaces/pages";

const Error = ({phase}:setPage) => {
    return (
        <div className="hero h-[80vh] bg-base-200">
            <div className="hero-content text-center">
                <div className="max-w-md">
                    <h1 className="text-5xl font-bold">Hello there</h1>
                    <p className="py-6">{phase === 3 ? 'Election not started yet' : 'You haven\'t registered for the current election'}</p>
                </div>
            </div>
        </div>
    );
};

export default Error;