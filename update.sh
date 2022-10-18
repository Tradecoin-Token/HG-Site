echo Updating respository ...
git pull
echo Rebuilding front-end pages...
cd client
npm run build
cd ..
echo Restarting API server
pm2 stop server
pm2 start server.js
