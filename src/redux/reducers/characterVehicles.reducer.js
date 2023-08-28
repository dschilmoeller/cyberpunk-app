const characterVehicles = (state = [], action) => {
    if (action.type === "SET_CHARACTER_VEHICLES") {
        return action.payload;
    }

    switch (action.type) {
        case "VEHICLE_ADD_ONE_DAMAGE":
            return state.map(vehicle => {
                if (vehicle.vehicle_bridge_id === action.payload) {
                    return { ...vehicle, current_damage: vehicle.current_damage + 1 }
                };
                return vehicle;
            });
        case "VEHICLE_REMOVE_ONE_DAMAGE":
            return state.map(vehicle => {
                if (vehicle.vehicle_bridge_id === action.payload) {
                    return { ...vehicle, current_damage: vehicle.current_damage - 1 }
                };
                return vehicle;
            });
        case "VEHICLE_ADD_ONE_ARMOR_DAMAGE":
            return state.map(vehicle => {
                if (vehicle.vehicle_bridge_id === action.payload) {
                    return { ...vehicle, current_armor_damage: vehicle.current_armor_damage + 1 }
                };
                return vehicle;
            });
        case "VEHICLE_REMOVE_ONE_ARMOR_DAMAGE":
            return state.map(vehicle => {
                if (vehicle.vehicle_bridge_id === action.payload) {
                    return { ...vehicle, current_armor_damage: vehicle.current_armor_damage - 1 }
                };
                return vehicle;
            });
    }
    return state;
}

export default characterVehicles;