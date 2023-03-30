module.exports = {
    purge: ["./public/**/*.html"],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            screens: {
                xsm: "320px",
                medium: "640px",
                large: "1020px",
            },
            keyframes: {
                "fade-in-down": {
                    "0%": {
                        opacity: "0",
                        transform: "translateY(-10px)",
                    },
                    "100%": {
                        opacity: "1",
                        transform: "translateY(0)",
                    },
                },
            },
            animation: {
                "fade-in-down": "fade-in-down 0.5s ease-in-out",
            },
            keyframes: {
                "show-cart": {
                    "100%": {
                        transform: "translate(200%)",
                    },
                },
            },
        },
    },

    variants: {
        extend: {},
    },
    plugins: [],
};
