import React from "react";
import { FcGraduationCap } from "react-icons/fc";

const Logo = () => {

    const textStyles = {
        e: "text-emerald-500",
        tuition: "text-indigo-700",
        bd: "text-emerald-500 dark:text-emerald-400 ml-0.5"
    };

    return (
        <div className={`flex items-center select-none gap-2 h-16 group`}>

            <div className="relative flex items-center h-full">

                <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full 
                 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                <span className="text-4xl relative z-10">
                    <FcGraduationCap />
                </span>
            </div>

            <h1 className="text-3xl font-extrabold tracking-tight leading-none font-sans 
               text-slate-800 dark:text-slate-100">

                <span className={textStyles.e}>e</span>
                <span className={textStyles.tuition}>Tuition</span>
                <span className={textStyles.bd}>Bd</span>

            </h1>
        </div>
    );
};

export default Logo;