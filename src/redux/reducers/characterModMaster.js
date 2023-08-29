const characterModMaster = (state = {
    vehicleMods: [],
    addedVehicleMods: [],
    removedVehicleMods: [],
}, action) => {
    switch (action.type) {
        case 'SET_CHARACTER_VEHICLE_MODS':
            return {
                ...state,
                vehicleMods: action.payload
            }
        case 'EQUIP_VEHICLE_MOD':
            return {
                ...state,
                // changes dom
                vehicleMods: [...state.vehicleMods, {
                    char_id: action.payload.modData.char_id,
                    char_owned_vehicle_mods_id: action.payload.modData.char_owned_vehicle_mods_id,
                    description: action.payload.modData.description,
                    equipped: true,
                    name: action.payload.modData.name,
                    price: action.payload.modData.price,
                    type: action.payload.modData.type,
                    vehicle_mod_master_id: action.payload.modData.vehicle_mod_master_id,
                    vehicle_bridge_id: action.payload.vehicle_bridge_id,
                }],
                // holding area for changed mods for PUT 
                addedVehicleMods: [...state.addedVehicleMods, {
                    char_id: action.payload.modData.char_id,
                    char_owned_vehicle_mods_id: action.payload.modData.char_owned_vehicle_mods_id,
                    description: action.payload.modData.description,
                    equipped: true,
                    name: action.payload.modData.name,
                    price: action.payload.modData.price,
                    type: action.payload.modData.type,
                    vehicle_mod_master_id: action.payload.modData.vehicle_mod_master_id,
                    vehicle_bridge_id: action.payload.vehicle_bridge_id,
                }]
            }
        default:
            return state
    }

}

export default characterModMaster