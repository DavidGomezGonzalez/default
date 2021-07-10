
// Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], Game.time, {memory: {working: false, role: 'harvester'}});
// Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, CARRY, MOVE, MOVE], Game.time, {memory: {working: false, role: 'upgrader'}});

//var roleHarvester = require('role.harvester');
//var roleUpgrader = require('role.upgrader');
//var roleBuilder = require('role.builder');

const roles = {
    harvester: require('HarvesterManager'),
    upgrader: require('UpgraderManager'),
    builder: require('role.builder'),
}


module.exports.loop = function () {

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');

    //console.log('Harvesters: ' + harvesters.length);

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    if(harvesters.length < 3) {
        var newName = 'Harvester' + Game.time;
        //console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], newName,
            {memory: {role: 'harvester'}});
    } else if(upgraders.length < 2) {
        var newName = 'Upgrader' + Game.time;
        //console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], newName,
            {memory: {role: 'upgrader'}});
<<<<<<< HEAD
    } else if(builders.length < 2) {
=======
    } else if(upgraders.length < 2) {
>>>>>>> 9e0941786026bee9c49ed9c0ed04cb390ef21d70
        var newName = 'Builder' + Game.time;
        //console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], newName,
          {memory: {role: 'builder'}});
    }

    /*if(builders.length < 1) {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], newName,
            {memory: {role: 'builder'}});
    }*/

    if(Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            {align: 'left', opacity: 0.8});
    }

    /*for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.runRole(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.runRole(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }*/

    // Run the harvester manager for every creep in the game
    for(const key in Game.creeps) {
        const creep = Game.creeps[key];
        roles[creep.memory.role].runRole(creep);
    }
}
