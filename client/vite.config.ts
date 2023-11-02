import { defineConfig, loadEnv, UserConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }: UserConfig) => {
  const env = loadEnv(mode, process.cwd(), "VITE");
  const config: UserConfig = {
    plugins: [react()],
    server: {
      proxy: {
        "/api": {
          target: env.VITE_PROXY,
          changeOrigin: true,
          secure: false,
          configure: (proxy) => {
            proxy.on("error", (err) => {
              console.log("proxy error", err);
            });
            proxy.on("proxyReq", (proxyReq, req) => {
              console.log(
                "Sending Request to the Target:",
                req.method,
                `${env.VITE_PROXY}${req.url}`
              );
            });
            proxy.on("proxyRes", (proxyRes, req) => {
              console.log(
                "Received Response from the Target:",
                proxyRes.statusCode,
                req.url
              );
            });
          },
        },
      },
    },
  };
  return config;
});
