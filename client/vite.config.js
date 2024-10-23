import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		host: '127.0.0.1',  //binds to IPv4 localhost
		port: 3000,  // custon port
		open: false // open the browser on server start
	}
})
