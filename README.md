# dX

D6:s patetförening heter X6, det här är något helt annat.

# Start
Installera MongoDB
```sh
sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
```

Installera nodejs och klona repot
```sh
curl -sL https://deb.nodesource.com/setup | sudo bash -
sudo apt-get install -y nodejs
git clone git@github.com:sebastiw/dX.git
cd dX
npm install
```

Starta projektet
```sh
node server
```

Om inga problem uppstår så är det bara att surfa in på
```
http://localhost:3000/
```

