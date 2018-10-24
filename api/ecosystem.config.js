module.exports = {
    apps: [
        {
            name: 'token',
            script: 'app.js',
            watch: true,
            "watch_options": {
                usePolling: true
            },
            env: {
                PORT: 3002
            },
            env_production: {
                NODE_ENV: 'production'
            }
        }
    ]
};