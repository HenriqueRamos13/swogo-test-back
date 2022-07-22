"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cluster = require("cluster");
const os = require("os");
require("dotenv/config");
const numCPUs = process.env.CPUS_TO_USE || os.cpus().length;
console.log("NUM CPUS", numCPUs);
class AppClusterService {
    static isMaster() {
        return cluster.isMaster;
    }
    static logRestarting(worker) {
        console.log(`Worker ${worker.process.pid} died. Restarting`);
    }
    static generateAFork() {
        cluster.fork();
    }
    static masterProcess() {
        for (let cpu = 0; cpu < numCPUs; cpu++) {
            this.generateAFork();
        }
        cluster.on("exit", (worker) => {
            this.logRestarting(worker);
            this.generateAFork();
        });
    }
    static clusterize(APP) {
        if (this.isMaster())
            return this.masterProcess();
        APP.start();
    }
}
exports.default = AppClusterService;
