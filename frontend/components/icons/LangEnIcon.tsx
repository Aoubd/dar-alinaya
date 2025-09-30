import React from 'react';

const LangEnIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" {...props}>
        <text
            x="50"
            y="50"
            fontFamily="Arial, sans-serif"
            fontSize="50"
            fontWeight="bold"
            textAnchor="middle"
            dominantBaseline="central"
            fill="currentColor"
        >
            EN
        </text>
    </svg>
);

export default LangEnIcon;
