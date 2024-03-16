export default function CyberwareCheck(incomingCyber, charCyberware) {
    // first check for attribute enhancing type duplication eg. grafted muscles I equipped and character is trying to equip grafted muscles II
    let alreadyEquipped = false;
    let equippedItemName = '';

    // regex expressions to check stat enhancing cyberware against.
    let algernonic = /Alger/;
    let grafted = /Grafted Musc/;
    let boneLaced = /Bone Lac/;
    let siliconize = /Nervous System Silicon/;

    // .test(data) checks 'contains string'
    if (algernonic.test(incomingCyber.name) === true) {
        for (let i = 0; i < charCyberware.length; i++) {
            if (algernonic.test(charCyberware[i].name) == true && (charCyberware[i].equipped === true)) {
                alreadyEquipped = true;
                equippedItemName = charCyberware[i].name
                break;
            }
        }
    } else if (grafted.test(incomingCyber.name) === true) {
        for (let i = 0; i < charCyberware.length; i++) {
            if (grafted.test(charCyberware[i].name) === true && (charCyberware[i].equipped === true)) {
                alreadyEquipped = true;
                equippedItemName = charCyberware[i].name
                break;
            }
        }
    } else if (boneLaced.test(incomingCyber.name) === true) {
        for (let i = 0; i < charCyberware.length; i++) {
            if (boneLaced.test(charCyberware[i].name) === true && (charCyberware[i].equipped === true)) {
                alreadyEquipped = true;
                equippedItemName = charCyberware[i].name
                break;
            }
        }
    } else if (siliconize.test(incomingCyber.name) === true) {
        for (let i = 0; i < charCyberware.length; i++) {
            if (siliconize.test(charCyberware[i].name) === true && (charCyberware[i].equipped === true)) {
                alreadyEquipped = true;
                equippedItemName = charCyberware[i].name
                break;
            }
        }
        // checking against different speedwares.
    } else if (incomingCyber.name === 'Kerenzikov'
        || incomingCyber.name === 'Sandevistan'
        || incomingCyber.name === 'Miilitech "Kali"') {
        for (let i = 0; i < charCyberware.length; i++) {
            if (
                (charCyberware[i].name === 'Kerenzikov'
                    || charCyberware[i].name === 'Sandevistan'
                    || charCyberware[i].name === 'Miilitech "Kali"')
                && charCyberware[i].equipped === true) {
                alreadyEquipped = true;
                equippedItemName = charCyberware[i].name
                break;
            }
        }
        // checking anti poison ware
    } else if (incomingCyber.name === 'Toxin Binders'
        || incomingCyber.name === 'Nasal Filters') {
        for (let i = 0; i < charCyberware.length; i++) {
            if (
                (charCyberware[i].name === 'Toxin Binders'
                    || charCyberware[i].name === 'Nasal Filters')
                && charCyberware[i].equipped === true) {
                alreadyEquipped = true;
                equippedItemName = charCyberware[i].name
                break;
            }
        }
        // checking heal ware
    } else if (incomingCyber.name === 'Platelet Booster'
        || incomingCyber.name === 'Nanotech Hive') {
        for (let i = 0; i < charCyberware.length; i++) {
            if (
                (charCyberware[i].name === 'Platelet Booster'
                    || charCyberware[i].name === 'Nanotech Hive')
                && charCyberware[i].equipped === true) {
                alreadyEquipped = true;
                equippedItemName = charCyberware[i].name
                break;
            }
        }
    } else if (incomingCyber.name === 'Linear Frame Alpha') {
        for (let i = 0; i < charCyberware.length; i++) {
            if ((charCyberware[i].name === 'Linear Frame Alpha'
                || charCyberware[i].name === 'Linear Frame Beta'
                || grafted.test(charCyberware[i].name) === true
                || boneLaced.test(charCyberware[i].name) === true
                || siliconize.test(charCyberware[i].name) === true
                || charCyberware[i].type === 'externalware'
                || charCyberware[i].name === 'Cyberarm - Right'
                || charCyberware[i].name === 'Cyberarm - Left'
                || charCyberware[i].name === 'Cyberleg - Right'
                || charCyberware[i].name === 'Cyberleg - Left'
            ) && charCyberware[i].equipped === true) {
                alreadyEquipped = true;
                equippedItemName = charCyberware[i].name
                break;
            }
        }
        if (charDetails.reflexes <= 1) {
            alreadyEquipped = true;
            equippedItemName = 'Reflexes too low!'
        }
    } else {
        // Checks if purely identical 'ware is already equipped.
        // allowed duplicates are ignored (memory chips); 
        // cyberarms are skipped as they have conditional allowance (ie Borg Shoulders) and are checked in equipCyber() below already.
        for (let i = 0; i < charCyberware.length; i++) {
            
            if (charCyberware[i].cyberware_master_id === incomingCyber.cyberware_master_id && charCyberware[i].equipped === true) {
                if (charCyberware[i].name === 'Memory chip'
                    || charCyberware[i].name === 'Cyberarm - Right'
                    || charCyberware[i].name === 'Cyberarm - Left') {
                    alreadyEquipped = false
                } else {
                    alreadyEquipped = true;
                    equippedItemName = charCyberware[i].name
                }
            }
        }
    }

    return {equipStatus: alreadyEquipped, equippedItemName}
}