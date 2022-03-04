module.exports = {
  apps : [
      {
        name: "myapp",
        script: "./api.js",
        watch: true,
        env: {
            "PORT": 3000,
            "NODE_ENV": "development"
        },
        env_production: {
            "PORT": 5000,
            "NODE_ENV": "production",
        },
         instances: "max",
         exec_mode: "cluster",
         ignore_watch : ["node_modules"]

      }
  ]
}

