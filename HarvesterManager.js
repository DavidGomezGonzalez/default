module.exports = {

    // Run the role for the Harvester creep
    /** @param {Creep} creep **/
    runRole: function (creep) {

        const creepCarry = creep.carry.energy;
        const creepCarryCapacity = creep.carryCapacity

        // Cases for switching states
        if(creep.memory.working && creepCarry === 0){
            creep.memory.working = false;
            creep.say('⛏️ WORK');
        } else if(!creep.memory.working && creepCarry === creepCarryCapacity){
            creep.memory.working = true;
            creep.say('🔋 ENERGY');
        }

        // Run the creep
        if(creep.memory.working) {

            // Creep is working, find closest spawn and transfer energy
            //const spawn = creep.pos.findClosestByPath(FIND_MY_SPAWNS);
            var spawn = Game.getObjectById('00121f043e2c64c');
            if(creep.transfer(spawn, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(spawn, {visualizePathStyle: {stroke: '#ffffff'}});
            } else {

              var thisRoom = Game.spawns["Spawn1"].room;
              var constructionSites = thisRoom.find(FIND_CONSTRUCTION_SITES);

              for (var site in constructionSites) {
                if (site.structureType == STRUCTURE_EXTENSION) {
                  if(creep.transfer(site, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                      creep.say('🔋EXTENSION');
                      creep.moveTo(site, {visualizePathStyle: {stroke: '#ffffff'}});
                  }
                }
              }

            }
        } else {
            // Creep is not working, get energy from source
            const source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
            if(creep.harvest(source) === ERR_NOT_IN_RANGE){
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
        }
    }
}
