trap 'kill %1; kill %2; kill %3; kill %4;' SIGINT
~$ node api/start.js & pushd public & ng serve --proxyConfig ../config/proxy.conf.json & popd & read -r -d '' _ </dev/tty