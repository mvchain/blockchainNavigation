
# npm install

git pull

npm run build

rm -rf /var/www/html/dist
rm -rf /var/www/html/static
rm -rf /var/www/html/index.html
mv dist /var/www/html
mv /var/www/html/dist/* /var/www/html

#rm -rf /var/www/html/nav
#mv dist /var/www/html/nav

