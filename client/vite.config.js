import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		// host: '127.0.0.1',  //binds to IPv4 localhost
		host: '0.0.0.0',  // Allows access from external IPs
		port: 5173,  // custom port
		open: false, // open the browser on server start
		proxy: {
			// Proxy API requests to backend server
			'/api': {
				// target: 'http://172.105.93.26:5000', // Backend server address
				target: 'http://localhost:5000',
				changeOrigin: true,
				secure: false,
				// rewrite: (path) => path.replace(/^\/api/, '')
			}
		}
	}
});
