import React from "react";

const Logo = ({ className = "h-16" }) => {
    return (
        <div className={`flex items-center select-none ${className}`}>
            {/* ICON */}
            <div className="relative group">
                {/* Glow */}
                <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* Brush SVG */}
                <svg
                    width="65"
                    height="65"
                    viewBox="0 0 100 100"
                    className="relative z-10 drop-shadow-xl transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110"
                >
                    <defs>
                        <linearGradient id="bambooBody" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#D4C5A0" />
                            <stop offset="50%" stopColor="#F8F4E3" />
                            <stop offset="100%" stopColor="#A68B5B" />
                        </linearGradient>

                        <linearGradient id="darkWood" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#4B3621" />
                            <stop offset="100%" stopColor="#2C1810" />
                        </linearGradient>

                        <linearGradient id="bristleInk" x1="0.5" y1="0" x2="0.5" y2="1">
                            <stop offset="0%" stopColor="#FDFBF7" />
                            <stop offset="40%" stopColor="#E5E5E5" />
                            <stop offset="65%" stopColor="#1E293B" />
                            <stop offset="100%" stopColor="#0F172A" />
                        </linearGradient>

                        <radialGradient id="jadeGem" cx="0.3" cy="0.3" r="0.8">
                            <stop offset="0%" stopColor="#6EE7B7" />
                            <stop offset="100%" stopColor="#047857" />
                        </radialGradient>

                        <linearGradient id="strokeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#1E1B4B" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.1" />
                        </linearGradient>
                    </defs>

                    {/* Background Stroke */}
                    <path
                        d="M20 75 Q35 95, 50 85 T85 40"
                        stroke="url(#strokeGradient)"
                        strokeWidth="6"
                        strokeLinecap="round"
                        fill="none"
                        className="opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out delay-100"
                        style={{ filter: "blur(1px)" }}
                    />

                    {/* Brush */}
                    <g transform="rotate(-15 50 50)">
                        {/* Tassel */}
                        <path
                            d="M48 5 C48 0, 52 0, 52 5 L50 12 Z"
                            stroke="#EF4444"
                            strokeWidth="1.5"
                            fill="none"
                        />

                        {/* Top Jade Cap */}
                        <path
                            d="M46 12 L54 12 L53 16 L47 16 Z"
                            fill="url(#jadeGem)"
                            stroke="#064E3B"
                            strokeWidth="0.5"
                        />

                        {/* Handle */}
                        <path d="M47 16 L53 16 L52.5 45 L47.5 45 Z" fill="url(#bambooBody)" />

                        {/* Nodes */}
                        <line x1="47.2" y1="25" x2="52.8" y2="25" stroke="#854D0E" strokeWidth="0.5" opacity="0.8" />
                        <line x1="47.4" y1="35" x2="52.6" y2="35" stroke="#854D0E" strokeWidth="0.5" opacity="0.8" />

                        {/* Ferrule */}
                        <path
                            d="M47.5 45 L52.5 45 C53 50, 53 52, 51 55 L49 55 C47 52, 47 50, 47.5 45 Z"
                            fill="url(#darkWood)"
                        />

                        {/* Bristles */}
                        <path
                            d="M49 55 C44 60, 42 75, 49.5 88 C50 89, 50 89, 50.5 88 C58 75, 56 60, 51 55 Z"
                            fill="url(#bristleInk)"
                        />

                        {/* Ink Shine */}
                        <path
                            d="M49.5 78 C48.5 80, 49 84, 50 86"
                            stroke="#6366F1"
                            strokeWidth="1"
                            strokeLinecap="round"
                            opacity="0.6"
                        />
                    </g>

                    {/* Animated Ink Drop */}
                    <circle cx="58" cy="85" r="2" fill="#1E293B" className="animate-bounce">
                        <animate attributeName="opacity" values="0;1;0" dur="2s" repeatCount="indefinite" />
                    </circle>
                </svg>
            </div>

            {/* TEXT */}
            <div className="flex flex-col -ml-4 justify-center">
                <h1 className="text-3xl font-extrabold tracking-tight leading-none font-sans text-slate-800 dark:text-slate-100">
                    <span className="text-transparent bg-clip-text bg-gradient-to-br from-emerald-500 to-teal-600">
                        e
                    </span>
                    <span className="text-indigo-800 dark:text-indigo-200">Tuition</span>
                    <span className="text-emerald-600 dark:text-emerald-400 ml-0.5">Bd</span>
                </h1>
            </div>
        </div>
    );
};

export default Logo;
