const characterModMaster = (
  state = {
    vehicleMods: [],
    addedVehicleMods: [],
    removedVehicleMods: [],
  },
  action
) => {
  switch (action.type) {
    case 'CLEAR_VEHICLE_MODS':
      return {
        vehicleMods: [],
        addedVehicleMods: [],
        removedVehicleMods: [],
      };
    case 'SET_ONE_CHARACTER_VEHICLE_MODS':
    case 'SET_ADVANCEMENT_ACTIVE_VEHICLE_MODS':
      return {
        ...state,
        vehicleMods: action.payload,
      };
    // case 'EQUIP_VEHICLE_MOD':
    //     return {
    //         ...state,
    //         // holding area for mods added to a vehicle for saving at end of session.
    //         addedVehicleMods: [...state.addedVehicleMods, {
    //             char_id: action.payload.modData.char_id,
    //             char_owned_vehicle_mods_id: action.payload.modData.char_owned_vehicle_mods_id,
    //             description: action.payload.modData.description,
    //             equipped: true,
    //             name: action.payload.modData.name,
    //             price: action.payload.modData.price,
    //             type: action.payload.modData.type,
    //             vehicle_mod_master_id: action.payload.modData.vehicle_mod_master_id,
    //             vehicle_bridge_id: action.payload.vehicle_bridge_id,
    //         }]
    //     }
    // case 'REMOVE_VEHICLE_MOD':
    //     return {
    //         ...state,
    //         // removes mod from main list and adds to removed list for saving at end of session.
    //         vehicleMods: state.vehicleMods.filter(mod => mod.char_vehicle_mod_bridge_id !== action.payload.modData.char_vehicle_mod_bridge_id),
    //         removedVehicleMods: [...state.removedVehicleMods, action.payload.modData]
    //     }
    // case 'REMOVE_NEW_VEHICLE_MOD':
    //     // unlike the above EQUIP/REMOVE_VEHICLE_MOD, this simply handles removing a mod added and removed in the same session.
    //     return {
    //         ...state,
    //         addedVehicleMods: state.addedVehicleMods.filter(mod => mod.char_owned_vehicle_mods_id !== action.payload.modData.char_owned_vehicle_mods_id)
    //     }
    default:
      return state;
  }
};

export default characterModMaster;
