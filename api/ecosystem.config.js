module.exports = {
    apps: [
        {
            name: 'token',
            script: 'app.js',
            watch: true,
            "watch_options": {
                usePolling: true
            },
            "ignore_watch" : ["./node_modules", "./public/"],
            env: {
                PORT: 3002
            },
            env_production: {
                NODE_ENV: 'production'
            }
        }
    ]
};