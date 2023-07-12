## Import Database
```
mysql -u username -p t2i < t2i.sql
```
  

## Configure Nodejs packages
```
npm install
```
  

## Start geth (local)
```
geth --http --http.corsdomain="*" --http.api web3,eth,debug,personal,net --vmdebug --datadir ./geth/ --dev console --rpc.txfeecap 0 --ws --ws.api web3,eth,debug,personal,net --ws.origins "*"
```
  
## Start backend
```
node index.js
```
