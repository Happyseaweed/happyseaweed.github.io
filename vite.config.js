// vite.config.js
export default {
    plugins: [
        // other plugins
    ],
    build: {
        // ...
        css: {
            extract: true, // Extract CSS into a separate file
        },
    },
}