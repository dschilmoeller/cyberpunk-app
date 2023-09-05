const characterVehicles = (state = [], action) => {
    if (action.type === "CLEAR_CHARACTER_VEHICLES") {
        return [];
    }

    switch (action.type) {
        case "SET_CHARACTER_VEHICLES":
            return action.payload;
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