module.exports = {

    // Run the role for the Worker creep
    /** @param {Creep} creep **/
    runRole: function (creep) {

        const creepCarry = creep.carry.energy;
        const creepCarryCapacity = creep.carryCapacity

        // Cases for switching states
        if(creep.memory.working && creepCarry === 0){
            creep.memory.working = false;
            creep.say('🔄 harvest');
        } else if(!creep.memory.working && creepCarry === creepCarryCapacity){
            creep.memory.working = true;
            creep.say('⚡ upgrade');
        }

        // Run the creep
        if(creep.memory.working) {

            // Creep is working, find closest spawn and transfer energy
            //const controller = creep.room.controller;
            const controller = Game.getObjectById('6aa0077274df11c');

            if(creep.upgradeController(controller) === ERR_NOT_IN_RANGE) {
                creep.moveTo(controller, {visualizePathStyle: {stroke: '#ffffff'}});
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
