import {
  updateCharacterRequest,
  updateCharacterStatusRequest,
  updateCyberwareEquipRequest,
  updateCyberwareSlotRequest,
  fetchEquipCharDetailsRequest,
  fetchEquipCharStatusRequest,
  fetchCharCyberwareRequest,
  fetchCharCyberwareStatusRequest,
} from '../../../services/Equip.services';

// TODO - no removing externalware w/o repair first. Or change current cyberware armor loss to 0 upon unequipping cyberware that affects armor?
function equipCyberwareHandler(
  incomingCyber,
  equipCharDetails,
  equipCharStatus,
  charGear,
  setEquipCharDetails,
  setEquipCharStatus,
  setCharGear,
  setPageAlert
) {
  // Test for humanity loss
  if (equipCharDetails.temp_humanity_loss + equipCharDetails.perm_humanity_loss + incomingCyber.humanity_loss_min > 40) {
    setPageAlert({ open: true, message: `You'll go psycho for sure if you equip that!`, severity: 'error' });
  } else {
    // checks for already equipped cyberware / incompatible choices (two types of bone lacing,eg.)
    let status = cyberwareDuplicateCheck(incomingCyber, equipCharDetails, charGear.cyberware);
    if (status.equipStatus === false) {
      // Test for slot count & Equip
      cyberwareVerification(
        incomingCyber,
        equipCharDetails,
        equipCharStatus,
        charGear.cyberwareStatus,
        charGear.cyberware,
        charGear,
        setEquipCharDetails,
        setEquipCharStatus,
        setCharGear,
        setPageAlert
      );
    } else {
      // in the event cyberware is already equipped - inform user of issue with equipping attempt.
      setPageAlert({ open: true, message: `Incompatible cyberware ${status.equippedItemName} detected`, severity: 'error' });
    }
  }
}

function cyberwareDuplicateCheck(incomingCyber, equipCharDetails, charCyberware) {
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
      if (algernonic.test(charCyberware[i].name) == true && charCyberware[i].equipped === true) {
        alreadyEquipped = true;
        equippedItemName = charCyberware[i].name;
        break;
      }
    }
  } else if (grafted.test(incomingCyber.name) === true) {
    for (let i = 0; i < charCyberware.length; i++) {
      if (grafted.test(charCyberware[i].name) === true && charCyberware[i].equipped === true) {
        alreadyEquipped = true;
        equippedItemName = charCyberware[i].name;
        break;
      }
    }
  } else if (boneLaced.test(incomingCyber.name) === true) {
    for (let i = 0; i < charCyberware.length; i++) {
      if (boneLaced.test(charCyberware[i].name) === true && charCyberware[i].equipped === true) {
        alreadyEquipped = true;
        equippedItemName = charCyberware[i].name;
        break;
      }
    }
  } else if (siliconize.test(incomingCyber.name) === true) {
    for (let i = 0; i < charCyberware.length; i++) {
      if (siliconize.test(charCyberware[i].name) === true && charCyberware[i].equipped === true) {
        alreadyEquipped = true;
        equippedItemName = charCyberware[i].name;
        break;
      }
    }
    // checking against different speedwares.
  } else if (incomingCyber.name === 'Kerenzikov' || incomingCyber.name === 'Sandevistan' || incomingCyber.name === 'Miilitech "Kali"') {
    for (let i = 0; i < charCyberware.length; i++) {
      if (
        (charCyberware[i].name === 'Kerenzikov' || charCyberware[i].name === 'Sandevistan' || charCyberware[i].name === 'Miilitech "Kali"') &&
        charCyberware[i].equipped === true
      ) {
        alreadyEquipped = true;
        equippedItemName = charCyberware[i].name;
        break;
      }
    }
    // checking anti poison ware
  } else if (incomingCyber.name === 'Toxin Binders' || incomingCyber.name === 'Nasal Filters') {
    for (let i = 0; i < charCyberware.length; i++) {
      if ((charCyberware[i].name === 'Toxin Binders' || charCyberware[i].name === 'Nasal Filters') && charCyberware[i].equipped === true) {
        alreadyEquipped = true;
        equippedItemName = charCyberware[i].name;
        break;
      }
    }
    // checking heal ware
  } else if (incomingCyber.name === 'Platelet Booster' || incomingCyber.name === 'Nanotech Hive') {
    for (let i = 0; i < charCyberware.length; i++) {
      if ((charCyberware[i].name === 'Platelet Booster' || charCyberware[i].name === 'Nanotech Hive') && charCyberware[i].equipped === true) {
        alreadyEquipped = true;
        equippedItemName = charCyberware[i].name;
        break;
      }
    }
  } else if (incomingCyber.name === 'Linear Frame Alpha' || incomingCyber.name === 'Linear Frame Beta') {
    for (let i = 0; i < charCyberware.length; i++) {
      if (
        (charCyberware[i].name === 'Linear Frame Alpha' ||
          charCyberware[i].name === 'Linear Frame Beta' ||
          grafted.test(charCyberware[i].name) === true ||
          boneLaced.test(charCyberware[i].name) === true ||
          siliconize.test(charCyberware[i].name) === true ||
          charCyberware[i].type === 'externalware' ||
          charCyberware[i].name === 'Cyberarm - Right' ||
          charCyberware[i].name === 'Cyberarm - Left' ||
          charCyberware[i].name === 'Cyberleg - Right' ||
          charCyberware[i].name === 'Cyberleg - Left') &&
        charCyberware[i].equipped === true
      ) {
        alreadyEquipped = true;
        equippedItemName = charCyberware[i].name;
        break;
      }
    }
    // if (equipCharDetails.reflexes <= 1) {
    //   alreadyEquipped = true;
    //   equippedItemName = 'Reflexes too low!';
    // }
  } else {
    // Checks if purely identical 'ware is already equipped.
    // allowed duplicates are ignored (memory chips);
    // cyberarms/legs are skipped as they can sometimes be duplicated and are checked elsewhere.
    for (let i = 0; i < charCyberware.length; i++) {
      if (charCyberware[i].cyberware_master_id === incomingCyber.cyberware_master_id && charCyberware[i].equipped === true) {
        if (
          charCyberware[i].name === 'Memory chip' ||
          charCyberware[i].name === 'Cyberarm - Right' ||
          charCyberware[i].name === 'Cyberarm - Left' ||
          charCyberware[i].name === 'Cyberleg - Right' ||
          charCyberware[i].name === 'Cyberleg - Left'
        ) {
          alreadyEquipped = false;
        } else {
          alreadyEquipped = true;
          equippedItemName = charCyberware[i].name;
        }
      }
    }
  }

  return { equipStatus: alreadyEquipped, equippedItemName };
}

async function cyberwareVerification(
  incomingCyber,
  equipCharDetails,
  equipCharStatus,
  cyberwareStatus,
  charCyberware,
  charGear,
  setEquipCharDetails,
  setEquipCharStatus,
  setCharGear,
  setPageAlert
) {
  // used in case of cyberlimb
  const armsObj = await armAndLegCounter(charCyberware);

  switch (incomingCyber.type) {
    case 'fashionware':
      if (cyberwareStatus.fashionware_slots > 0) {
        const equipResult = await equipCyberware(incomingCyber);
        const slotResult = await cyberSlotChange(cyberwareStatus, 'fashionware_slots', -1);
        const statResult = await cyberStatChange(incomingCyber, equipCharDetails, true);

        if (slotResult === 'OK' && equipResult === 'OK' && statResult === 'OK') {
          fetchCharData(equipCharDetails.id, charGear, setCharGear, setEquipCharDetails, setEquipCharStatus);
        }
        break;
      } else {
        setPageAlert({ open: true, message: 'Try being less fashionable before you equip that!', severity: 'warning' });
        break;
      }
    case 'neuralware':
      if (incomingCyber.name === 'Basic Neural Link') {
        const equipResult = await equipCyberware(incomingCyber);
        const humanityResult = await cyberHumanityChange(incomingCyber, equipCharDetails, true);
        const slotResult = await cyberSlotChange(cyberwareStatus, 'neuralware_slots', 5);
        console.log(`results:`, equipResult, humanityResult, slotResult);
        if (equipResult === 'OK' && humanityResult === 'OK' && slotResult === 'OK') {
          fetchCharData(equipCharDetails.id, charGear, setCharGear, setEquipCharDetails, setEquipCharStatus);
        }

        break;
      } else if (cyberwareStatus.neuralware_slots > 0) {
        const equipResult = await equipCyberware(incomingCyber);
        const slotResult = await cyberSlotChange(cyberwareStatus, 'neuralware_slots', -1);
        const statResult = await cyberStatChange(incomingCyber, equipCharDetails, true);
        if (equipResult === 'OK' && slotResult === 'OK' && statResult === 'OK') {
          fetchCharData(equipCharDetails.id, charGear, setCharGear, setEquipCharDetails, setEquipCharStatus);
        }

        break;
      } else {
        setPageAlert({ open: true, message: 'Not enough slots - make sure you have a neural link installed!', severity: 'warning' });
        break;
      }
    case 'cyberoptics':
      if (incomingCyber.name === 'Basic Cybereyes') {
        const equipResult = await equipCyberware(incomingCyber);
        const humanityResult = await cyberHumanityChange(incomingCyber, equipCharDetails, true);
        const slotResult = await cyberSlotChange(cyberwareStatus, 'cyberoptic_slots', 3);
        if (equipResult === 'OK' && humanityResult === 'OK' && slotResult === 'OK') {
          fetchCharData(equipCharDetails.id, charGear, setCharGear, setEquipCharDetails, setEquipCharStatus);
        }
        break;
      } else if (cyberwareStatus.cyberoptic_slots > 0) {
        const equipResult = await equipCyberware(incomingCyber);
        const slotResult = await cyberSlotChange(cyberwareStatus, 'cyberoptic_slots', -1);
        if (equipResult === 'OK' && slotResult === 'OK') {
          fetchCharData(equipCharDetails.id, charGear, setCharGear, setEquipCharDetails, setEquipCharStatus);
        }
        break;
      } else {
        setPageAlert({ open: true, message: `Not enough slots - make sure you have cybereyes and they aren't already full!`, severity: 'warning' });
        break;
      }
    case 'cyberaudio':
      if (incomingCyber.name === 'Basic Cyberaudio Suite') {
        const equipResult = await equipCyberware(incomingCyber);
        const humanityResult = await cyberHumanityChange(incomingCyber, equipCharDetails, true);
        const slotResult = await cyberSlotChange(cyberwareStatus, 'cyberaudio_slots', 3);
        if (equipResult === 'OK' && humanityResult === 'OK' && slotResult === 'OK') {
          fetchCharData(equipCharDetails.id, charGear, setCharGear, setEquipCharDetails, setEquipCharStatus);
        }
        break;
      } else if (cyberwareStatus.cyberaudio_slots > 0) {
        const equipResult = await equipCyberware(incomingCyber);
        const slotResult = await cyberSlotChange(cyberwareStatus, 'cyberaudio_slots', -1);
        if (equipResult === 'OK' && slotResult === 'OK') {
          fetchCharData(equipCharDetails.id, charGear, setCharGear, setEquipCharDetails, setEquipCharStatus);
        }
        break;
      } else {
        setPageAlert({ open: true, message: `Not enough slots - make sure you have a cyberaudio suite installed!`, severity: 'warning' });
        break;
      }
    case 'internalware':
      if (cyberwareStatus.internalware_slots > 0) {
        // changes equip
        const equipResult = await equipCyberware(incomingCyber);
        const humanityResult = await cyberHumanityChange(incomingCyber, equipCharDetails, true);
        const slotResult = await cyberSlotChange(cyberwareStatus, 'internalware_slots', -1);
        const statResult = await cyberStatChange(incomingCyber, equipCharDetails, true);
        const armorResult = await cyberArmorChange(incomingCyber, equipCharStatus, true);
        if (equipResult === 'OK' && humanityResult === 'OK' && slotResult === 'OK' && statResult === 'OK' && armorResult === 'OK') {
          fetchCharData(equipCharDetails.id, charGear, setCharGear, setEquipCharDetails, setEquipCharStatus);
        }
        break;
      } else {
        setPageAlert({ open: true, message: 'Not enough slots - your body is full!', severity: 'warning' });
        break;
      }
    case 'externalware':
      if (cyberwareStatus.externalware_slots > 0) {
        const equipResult = await equipCyberware(incomingCyber);
        const humanityResult = await cyberHumanityChange(incomingCyber, equipCharDetails, true);
        const slotResult = await cyberSlotChange(cyberwareStatus, 'externalware_slots', -1);
        const statResult = await cyberStatChange(incomingCyber, equipCharDetails, true);
        const armorResult = await cyberArmorChange(incomingCyber, equipCharStatus, true);
        if (equipResult === 'OK' && humanityResult === 'OK' && slotResult === 'OK' && statResult === 'OK' && armorResult === 'OK') {
          fetchCharData(equipCharDetails.id, charGear, setCharGear, setEquipCharDetails, setEquipCharStatus);
        }
        break;
      } else {
        setPageAlert({ open: true, message: 'Only one external piece can be equipped at a time!', severity: 'warning' });
        break;
      }
    case 'cyberarm':
      if (
        (incomingCyber.name === 'Cyberarm - Right' && armsObj.rightShoulderAvail > 0) ||
        (incomingCyber.name === 'Cyberarm - Left' && armsObj.leftShoulderAvail > 0)
      ) {
        // changes equip
        const equipResult = await equipCyberware(incomingCyber);
        const humanityResult = await cyberHumanityChange(incomingCyber, equipCharDetails, true);
        const slotResult = await cyberSlotChange(cyberwareStatus, 'cyberarm_slots', 3);
        const armorResult = await cyberArmorChange(incomingCyber, equipCharStatus, true);
        if (equipResult === 'OK' && humanityResult === 'OK' && slotResult === 'OK' && armorResult === 'OK') {
          fetchCharData(equipCharDetails.id, charGear, setCharGear, setEquipCharDetails, setEquipCharStatus);
        }
        break;
      } else if (
        (incomingCyber.name === 'Cyberarm - Right' && armsObj.rightShoulderAvail <= 0) ||
        (incomingCyber.name === 'Cyberarm - Left' && armsObj.leftShoulderAvail <= 0)
      ) {
        setPageAlert({ open: true, message: `You already have that arm equipped!`, severity: 'warning' });
        break;
      } else if (
        // Duplicates of these aren't allowed to be equipped
        // These don't take a slot, and CAN be installed in non-cyberware arms as a result
        incomingCyber.name === 'Big Knucks' ||
        incomingCyber.name === 'Scratchers' ||
        incomingCyber.name === 'Rippers' ||
        incomingCyber.name === 'Wolvers'
      ) {
        // changes equip
        const equipResult = await equipCyberware(incomingCyber);
        const humanityResult = await cyberHumanityChange(incomingCyber, equipCharDetails, true);
        if (equipResult === 'OK' && humanityResult === 'OK') {
          fetchCharData(equipCharDetails.id, charGear, setCharGear, setEquipCharDetails, setEquipCharStatus);
        }
        break;
      } else if (cyberwareStatus.cyberarm_slots > 0) {
        const equipResult = await equipCyberware(incomingCyber);
        const slotResult = await cyberSlotChange(cyberwareStatus, 'cyberarm_slots', -1);
        if (equipResult === 'OK' && slotResult === 'OK') {
          fetchCharData(equipCharDetails.id, charGear, setCharGear, setEquipCharDetails, setEquipCharStatus);
        }
        break;
      } else {
        setPageAlert({ open: true, message: `No slots - make sure you have a cyberarm and it isn't full!`, severity: 'warning' });
        break;
      }
    case 'cyberleg':
      if (
        (incomingCyber.name === 'Cyberleg - Right' && armsObj.rightLegAvail > 0) ||
        (incomingCyber.name === 'Cyberleg - Left' && armsObj.leftLegAvail > 0)
      ) {
        const equipResult = await equipCyberware(incomingCyber);
        const humanityResult = await cyberHumanityChange(incomingCyber, equipCharDetails, true);
        const slotResult = await cyberSlotChange(cyberwareStatus, 'cyberleg_slots', 3);
        const armorResult = await cyberArmorChange(incomingCyber, equipCharStatus, true);
        if (equipResult === 'OK' && humanityResult === 'OK' && slotResult === 'OK' && armorResult === 'OK') {
          fetchCharData(equipCharDetails.id, charGear, setCharGear, setEquipCharDetails, setEquipCharStatus);
        }
        break;
      } else if (
        (incomingCyber.name === 'Cyberleg - Right' && armsObj.rightLegAvail <= 0) ||
        (incomingCyber.name === 'Cyberleg - Left' && armsObj.leftLegAvail <= 0)
      ) {
        setPageAlert({ open: true, message: `You already have that leg equipped!`, severity: 'warning' });
        break;
      } else if (cyberwareStatus.cyberleg_slots > 0) {
        const equipResult = await equipCyberware(incomingCyber);
        const slotResult = await cyberSlotChange(cyberwareStatus, 'cyberleg_slots', -1);
        if (equipResult === 'OK' && slotResult === 'OK') {
          fetchCharData(equipCharDetails.id, charGear, setCharGear, setEquipCharDetails, setEquipCharStatus);
        }
        break;
      } else {
        setPageAlert({ open: true, message: `No slots - make sure you have a cyberleg and it isn't full!`, severity: 'warning' });
        break;
      }
    case 'borgware':
      if (incomingCyber.name === 'Artificial Shoulder Mount') {
        const equipResult = await equipCyberware(incomingCyber);
        const humanityResult = await cyberHumanityChange(incomingCyber, equipCharDetails, true);
        if (equipResult === 'OK' && humanityResult === 'OK') {
          fetchCharData(equipCharDetails.id, charGear, setCharGear, setEquipCharDetails, setEquipCharStatus);
        }
        break;
      } else if (incomingCyber.name === 'Multi-Optic Mount') {
        const equipResult = await equipCyberware(incomingCyber);
        const humanityResult = await cyberHumanityChange(incomingCyber, equipCharDetails, true);
        const slotResult = await cyberSlotChange(cyberwareStatus, 'cyberoptic_slots', 5);
        if (equipResult === 'OK' && humanityResult === 'OK' && slotResult === 'OK') {
          fetchCharData(equipCharDetails.id, charGear, setCharGear, setEquipCharDetails, setEquipCharStatus);
        }
        break;
      } else if (incomingCyber.name === 'Sensor Array') {
        const equipResult = await equipCyberware(incomingCyber);
        const humanityResult = await cyberHumanityChange(incomingCyber, equipCharDetails, true);
        const slotResult = await cyberSlotChange(cyberwareStatus, 'cyberaudio_slots', 5);
        if (equipResult === 'OK' && humanityResult === 'OK' && slotResult === 'OK') {
          fetchCharData(equipCharDetails.id, charGear, setCharGear, setEquipCharDetails, setEquipCharStatus);
        }
        break;
      } else if (incomingCyber.name === 'Linear Frame Alpha' || incomingCyber.name === 'Linear Frame Beta') {
        const equipResult = await equipCyberware(incomingCyber);
        const humanityResult = await cyberHumanityChange(incomingCyber, equipCharDetails, true);
        const armorResult = await cyberArmorChange(incomingCyber, equipCharStatus, true);
        const statResult = await cyberStatChange(incomingCyber, equipCharDetails, true);

        if (equipResult === 'OK' && humanityResult === 'OK' && armorResult === 'OK' && statResult === 'OK') {
          fetchCharData(equipCharDetails.id, charGear, setCharGear, setEquipCharDetails, setEquipCharStatus);
        }
        break;
      } else {
        setPageAlert({ open: true, message: `ERROR BORGWARE NOT SUPPORTED - CONTACT YOUR GM AT ONCE!`, severity: 'error' });
        break;
      }
    default:
      break;
  }
}

async function fetchCharData(charID, charGear, setCharGear, setEquipCharDetails, setEquipCharStatus) {
  let charCyberware = await fetchCharCyberwareRequest({ charID: charID });
  let charCyberwareStatus = await fetchCharCyberwareStatusRequest({ charID: charID });
  setCharGear({ ...charGear, cyberware: charCyberware, cyberwareStatus: charCyberwareStatus });
  let charDetails = await fetchEquipCharDetailsRequest({ charID: charID });
  setEquipCharDetails(charDetails);
  let charStatus = await fetchEquipCharStatusRequest({ charID: charID });
  setEquipCharStatus(charStatus);
}

async function armAndLegCounter(charCyberware) {
  let armsObj = {
    rightShoulderAvail: 1,
    leftShoulderAvail: 1,
    rightLegAvail: 1,
    leftLegAvail: 1,
  };
  for (let i = 0; i < charCyberware.length; i++) {
    // If artificial shoulder mount is equipped, +1 to L/R shoulders avail.
    if (charCyberware[i].name === 'Artificial Shoulder Mount' && charCyberware[i].equipped === true) {
      armsObj = { ...armsObj, rightShoulderAvail: (armsObj.rightShoulderAvail += 1), leftShoulderAvail: (armsObj.leftShoulderAvail += 1) };
    } else if (charCyberware[i].name === 'Spider Leg Mount' && charCyberware[i].equipped === true) {
      armsObj = { ...armsObj, rightLegAvail: (armsObj.rightLegAvail += 1), leftLegAvail: (armsObj.leftLegAvail += 1) };
      // If an arm/leg is equipped, -1 available relevant armsObj
    } else if (charCyberware[i].name === 'Cyberarm - Right' && charCyberware[i].equipped === true) {
      armsObj = { ...armsObj, rightShoulderAvail: (armsObj.rightShoulderAvail += -1) };
    } else if (charCyberware[i].name === 'Cyberarm - Left' && charCyberware[i].equipped === true) {
      armsObj = { ...armsObj, leftShoulderAvail: (armsObj.leftShoulderAvail += -1) };
    } else if (charCyberware[i].name === 'Cyberleg - Right' && charCyberware[i].equipped === true) {
      armsObj = { ...armsObj, rightLegAvail: (armsObj.rightLegAvail += -1) };
    } else if (charCyberware[i].name === 'Cyberleg - Left' && charCyberware[i].equipped === true) {
      armsObj = { ...armsObj, leftLegAvail: (armsObj.leftLegAvail += -1) };
    }
  }
  return armsObj;
}

async function equipCyberware(incomingCyber) {
  let cyberObj = {
    equipped: true,
    owned_cyberware_id: incomingCyber.owned_cyberware_id,
  };
  return await updateCyberwareEquipRequest(cyberObj);
}

async function unequipCyberware(incomingCyber) {
  let cyberObj = {
    equipped: false,
    owned_cyberware_id: incomingCyber.owned_cyberware_id,
  };
  return await updateCyberwareEquipRequest(cyberObj);
}

async function cyberSlotChange(cyberwareStatus, columnName, change) {
  let slotObj = {
    columnName: columnName,
    slotCount: cyberwareStatus[columnName] + change,
    cyberware_bridge_id: cyberwareStatus.cyberware_bridge_id,
  };
  return await updateCyberwareSlotRequest(slotObj);
}

async function cyberHumanityChange(incomingCyber, equipCharDetails, loss) {
  // If loss = true => lose humanity track (perm and temp)
  // if loss = false => gain humanity track (perm changes only)

  let itemTempLoss = Math.floor(Math.random() * (incomingCyber.humanity_loss_max - incomingCyber.humanity_loss_min + 1));

  if (loss === true) {
    let humanityTempObj = {
      statName: 'temp_humanity_loss',
      newRank: equipCharDetails.temp_humanity_loss + itemTempLoss,
      charID: equipCharDetails.id,
    };
    let tempResult = await updateCharacterRequest(humanityTempObj);

    let humanityPermObj = {
      statName: 'perm_humanity_loss',
      newRank: equipCharDetails.perm_humanity_loss + incomingCyber.humanity_loss_min,
      charID: equipCharDetails.id,
    };
    let permResult = await updateCharacterRequest(humanityPermObj);

    if (tempResult === 'OK' && permResult === 'OK') {
      return 'OK';
    } else {
      console.error('Error equipping item:', incomingCyber);
    }
  } else if (loss === false) {
    // unequipping - reduce current permanent humanity loss by the min value.
    let humanityPermObj = {
      statName: 'perm_humanity_loss',
      newRank: equipCharDetails.perm_humanity_loss - incomingCyber.humanity_loss_min,
      charID: equipCharDetails.id,
    };
    // Expected result is 'OK' or throwing error.
    return await updateCharacterRequest(humanityPermObj);
  } else {
    console.error('error - humanity change not determined while equipping item:', incomingCyber);
  }
}

async function cyberStatChange(incomingCyber, equipCharDetails, equip) {
  let statResult = '';
  if (incomingCyber.name === 'Light Tattoo' && equip === true) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_appearance',
      newRank: equipCharDetails.cyber_appearance + 1,
    });
  } else if (incomingCyber.name === 'Light Tattoo' && equip === false) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_appearance',
      newRank: equipCharDetails.cyber_appearance - 1,
    });
  } else if (incomingCyber.name === 'Techhair' && equip === true) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_cool',
      newRank: equipCharDetails.cyber_cool + 1,
    });
  } else if (incomingCyber.name === 'Techhair' && equip === false) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_cool',
      newRank: equipCharDetails.cyber_cool - 1,
    });
  } else if (incomingCyber.name === 'Nervous System Regulator' && equip === true) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_cool',
      newRank: equipCharDetails.cyber_cool + 1,
    });
  } else if (incomingCyber.name === 'Nervous System Regulator' && equip === false) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_cool',
      newRank: equipCharDetails.cyber_cool - 1,
    });
  } else if (incomingCyber.name === 'Algernonic Subprocessors I' && equip === true) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_intelligence',
      newRank: equipCharDetails.cyber_intelligence + 1,
    });
  } else if (incomingCyber.name === 'Algernonic Subprocessors II' && equip === true) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_intelligence',
      newRank: equipCharDetails.cyber_intelligence + 2,
    });
  } else if (incomingCyber.name === 'Algernonic Subprocessors III' && equip === true) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_intelligence',
      newRank: equipCharDetails.cyber_intelligence + 3,
    });
  } else if (incomingCyber.name === 'Algernonic Subprocessors IV' && equip === true) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_intelligence',
      newRank: equipCharDetails.cyber_intelligence + 4,
    });
  } else if (incomingCyber.name === 'Algernonic Subprocessors V' && equip === true) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_intelligence',
      newRank: equipCharDetails.cyber_intelligence + 5,
    });
  } else if (incomingCyber.name === 'Algernonic Subprocessors I' && equip === false) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_intelligence',
      newRank: equipCharDetails.cyber_intelligence - 1,
    });
  } else if (incomingCyber.name === 'Algernonic Subprocessors II' && equip === false) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_intelligence',
      newRank: equipCharDetails.cyber_intelligence - 2,
    });
  } else if (incomingCyber.name === 'Algernonic Subprocessors III' && equip === false) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_intelligence',
      newRank: equipCharDetails.cyber_intelligence - 3,
    });
  } else if (incomingCyber.name === 'Algernonic Subprocessors IV' && equip === false) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_intelligence',
      newRank: equipCharDetails.cyber_intelligence - 4,
    });
  } else if (incomingCyber.name === 'Algernonic Subprocessors V' && equip === false) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_intelligence',
      newRank: equipCharDetails.cyber_intelligence - 5,
    });
  } else if (incomingCyber.name === 'Grafted Muscles I' && equip === true) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_strength',
      newRank: equipCharDetails.cyber_strength + 1,
    });
  } else if (incomingCyber.name === 'Grafted Muscles II' && equip === true) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_strength',
      newRank: equipCharDetails.cyber_strength + 2,
    });
  } else if (incomingCyber.name === 'Grafted Muscles III' && equip === true) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_strength',
      newRank: equipCharDetails.cyber_strength + 3,
    });
  } else if (incomingCyber.name === 'Grafted Muscles IV' && equip === true) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_strength',
      newRank: equipCharDetails.cyber_strength + 4,
    });
  } else if (incomingCyber.name === 'Grafted Muscles V' && equip === true) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_strength',
      newRank: equipCharDetails.cyber_strength + 5,
    });
  } else if (incomingCyber.name === 'Grafted Muscles I' && equip === false) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_strength',
      newRank: equipCharDetails.cyber_strength - 1,
    });
  } else if (incomingCyber.name === 'Grafted Muscles II' && equip === false) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_strength',
      newRank: equipCharDetails.cyber_strength - 2,
    });
  } else if (incomingCyber.name === 'Grafted Muscles III' && equip === false) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_strength',
      newRank: equipCharDetails.cyber_strength - 3,
    });
  } else if (incomingCyber.name === 'Grafted Muscles IV' && equip === false) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_strength',
      newRank: equipCharDetails.cyber_strength - 4,
    });
  } else if (incomingCyber.name === 'Grafted Muscles V' && equip === false) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_strength',
      newRank: equipCharDetails.cyber_strength - 5,
    });
  } else if (incomingCyber.name === 'Bone Lacing I' && equip === true) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_body',
      newRank: equipCharDetails.cyber_body + 1,
    });
  } else if (incomingCyber.name === 'Bone Lacing II' && equip === true) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_body',
      newRank: equipCharDetails.cyber_body + 2,
    });
  } else if (incomingCyber.name === 'Bone Lacing III' && equip === true) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_body',
      newRank: equipCharDetails.cyber_body + 3,
    });
  } else if (incomingCyber.name === 'Bone Lacing IV' && equip === true) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_body',
      newRank: equipCharDetails.cyber_body + 4,
    });
  } else if (incomingCyber.name === 'Bone Lacing V' && equip === true) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_body',
      newRank: equipCharDetails.cyber_body + 5,
    });
  } else if (incomingCyber.name === 'Bone Lacing I' && equip === false) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_body',
      newRank: equipCharDetails.cyber_body - 1,
    });
  } else if (incomingCyber.name === 'Bone Lacing II' && equip === false) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_body',
      newRank: equipCharDetails.cyber_body - 2,
    });
  } else if (incomingCyber.name === 'Bone Lacing III' && equip === false) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_body',
      newRank: equipCharDetails.cyber_body - 3,
    });
  } else if (incomingCyber.name === 'Bone Lacing IV' && equip === false) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_body',
      newRank: equipCharDetails.cyber_body - 4,
    });
  } else if (incomingCyber.name === 'Bone Lacing V' && equip === false) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_body',
      newRank: equipCharDetails.cyber_body - 5,
    });
  } else if (incomingCyber.name === 'Nervous System Siliconization I' && equip === true) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_reflexes',
      newRank: equipCharDetails.cyber_reflexes + 1,
    });
  } else if (incomingCyber.name === 'Nervous System Siliconization II' && equip === true) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_reflexes',
      newRank: equipCharDetails.cyber_reflexes + 2,
    });
  } else if (incomingCyber.name === 'Nervous System Siliconization III' && equip === true) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_reflexes',
      newRank: equipCharDetails.cyber_reflexes + 3,
    });
  } else if (incomingCyber.name === 'Nervous System Siliconization IV' && equip === true) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_reflexes',
      newRank: equipCharDetails.cyber_reflexes + 4,
    });
  } else if (incomingCyber.name === 'Nervous System Siliconization V' && equip === true) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_reflexes',
      newRank: equipCharDetails.cyber_reflexes + 5,
    });
  } else if (incomingCyber.name === 'Nervous System Siliconization I' && equip === false) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_reflexes',
      newRank: equipCharDetails.cyber_reflexes - 1,
    });
  } else if (incomingCyber.name === 'Nervous System Siliconization II' && equip === false) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_reflexes',
      newRank: equipCharDetails.cyber_reflexes - 2,
    });
  } else if (incomingCyber.name === 'Nervous System Siliconization III' && equip === false) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_reflexes',
      newRank: equipCharDetails.cyber_reflexes - 3,
    });
  } else if (incomingCyber.name === 'Nervous System Siliconization IV' && equip === false) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_reflexes',
      newRank: equipCharDetails.cyber_reflexes - 4,
    });
  } else if (incomingCyber.name === 'Nervous System Siliconization V' && equip === false) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_reflexes',
      newRank: equipCharDetails.cyber_reflexes - 5,
    });
  } else if (incomingCyber.name === 'Chromed Exo-Armor' && equip === true) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_appearance',
      newRank: equipCharDetails.cyber_appearance + 1,
    });
  } else if (incomingCyber.name === 'Chromed Exo-Armor' && equip === false) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_appearance',
      newRank: equipCharDetails.cyber_appearance - 1,
    });
  } else if (incomingCyber.name === 'Linear Frame Alpha' && equip === true) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_body',
      newRank: equipCharDetails.cyber_strength + 3,
    });
    if (statResult === 'OK') {
      statResult = await updateCharacterRequest({
        charID: equipCharDetails.id,
        statName: 'cyber_strength',
        newRank: equipCharDetails.cyber_body + 3,
      });
    }
  } else if (incomingCyber.name === 'Linear Frame Alpha' && equip === false) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_body',
      newRank: equipCharDetails.cyber_strength - 3,
    });
    if (statResult === 'OK') {
      statResult = await updateCharacterRequest({
        charID: equipCharDetails.id,
        statName: 'cyber_strength',
        newRank: equipCharDetails.cyber_body - 3,
      });
    }
  } else if (incomingCyber.name === 'Linear Frame Beta' && equip === true) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_body',
      newRank: equipCharDetails.cyber_strength + 4,
    });
    if (statResult === 'OK') {
      statResult = await updateCharacterRequest({
        charID: equipCharDetails.id,
        statName: 'cyber_strength',
        newRank: equipCharDetails.cyber_body + 4,
      });
    }
  } else if (incomingCyber.name === 'Linear Frame Beta' && equip === false) {
    statResult = await updateCharacterRequest({
      charID: equipCharDetails.id,
      statName: 'cyber_body',
      newRank: equipCharDetails.cyber_strength - 4,
    });
    if (statResult === 'OK') {
      statResult = await updateCharacterRequest({
        charID: equipCharDetails.id,
        statName: 'cyber_strength',
        newRank: equipCharDetails.cyber_body - 4,
      });
    }
  } else {
    statResult = 'OK';
  }
  return statResult;
}

async function cyberArmorChange(incomingCyber, equipCharStatus, equip) {
  let armorResult = '';
  let healthResult = '';
  if (incomingCyber.name === 'Skin Weave' && equip === true) {
    armorResult = await updateCharacterStatusRequest({
      charID: equipCharStatus.char_id,
      statName: 'current_cyberware_armor_quality',
      newRank: equipCharStatus.current_cyberware_armor_quality + 2,
    });
    healthResult = 'OK';
  } else if (incomingCyber.name === 'Skin Weave' && equip === false) {
    armorResult = await updateCharacterStatusRequest({
      charID: equipCharStatus.char_id,
      statName: 'current_cyberware_armor_quality',
      newRank: equipCharStatus.current_cyberware_armor_quality - 2,
    });
    healthResult = 'OK';
  } else if (incomingCyber.name === 'Subdermal Armor' && equip === true) {
    armorResult = await updateCharacterStatusRequest({
      charID: equipCharStatus.char_id,
      statName: 'current_cyberware_armor_quality',
      newRank: equipCharStatus.current_cyberware_armor_quality + 3,
    });
    healthResult = await updateCharacterStatusRequest({
      charID: equipCharStatus.char_id,
      statName: 'current_cyberware_health_boxes',
      newRank: equipCharStatus.current_cyberware_health_boxes + 2,
    });
  } else if (incomingCyber.name === 'Subdermal Armor' && equip === false) {
    armorResult = await updateCharacterStatusRequest({
      charID: equipCharStatus.char_id,
      statName: 'current_cyberware_armor_quality',
      newRank: equipCharStatus.current_cyberware_armor_quality - 3,
    });
    healthResult = await updateCharacterStatusRequest({
      charID: equipCharStatus.char_id,
      statName: 'current_cyberware_health_boxes',
      newRank: equipCharStatus.current_cyberware_health_boxes - 2,
    });
  } else if (incomingCyber.name === 'Body Plating' && equip === true) {
    armorResult = await updateCharacterStatusRequest({
      charID: equipCharStatus.char_id,
      statName: 'current_cyberware_armor_quality',
      newRank: equipCharStatus.current_cyberware_armor_quality + 5,
    });
    healthResult = await updateCharacterStatusRequest({
      charID: equipCharStatus.char_id,
      statName: 'current_cyberware_health_boxes',
      newRank: equipCharStatus.current_cyberware_health_boxes + 3,
    });
  } else if (incomingCyber.name === 'Body Plating' && equip === false) {
    armorResult = await updateCharacterStatusRequest({
      charID: equipCharStatus.char_id,
      statName: 'current_cyberware_armor_quality',
      newRank: equipCharStatus.current_cyberware_armor_quality - 5,
    });
    healthResult = await updateCharacterStatusRequest({
      charID: equipCharStatus.char_id,
      statName: 'current_cyberware_health_boxes',
      newRank: equipCharStatus.current_cyberware_health_boxes - 3,
    });
  } else if (incomingCyber.name === 'Chromed Exo-Armor' && equip === true) {
    armorResult = await updateCharacterStatusRequest({
      charID: equipCharStatus.char_id,
      statName: 'current_cyberware_armor_quality',
      newRank: equipCharStatus.current_cyberware_armor_quality + 4,
    });
    healthResult = await updateCharacterStatusRequest({
      charID: equipCharStatus.char_id,
      statName: 'current_cyberware_health_boxes',
      newRank: equipCharStatus.current_cyberware_health_boxes + 2,
    });
  } else if (incomingCyber.name === 'Chromed Exo-Armor' && equip === false) {
    armorResult = await updateCharacterStatusRequest({
      charID: equipCharStatus.char_id,
      statName: 'current_cyberware_armor_quality',
      newRank: equipCharStatus.current_cyberware_armor_quality - 4,
    });
    healthResult = await updateCharacterStatusRequest({
      charID: equipCharStatus.char_id,
      statName: 'current_cyberware_health_boxes',
      newRank: equipCharStatus.current_cyberware_health_boxes - 2,
    });
  } else if (
    (incomingCyber.name === 'Cyberarm - Right' ||
      incomingCyber.name === 'Cyberarm - Left' ||
      incomingCyber.name === 'Cyberleg - Right' ||
      incomingCyber.name === 'Cyberleg - Left') &&
    equip === true
  ) {
    healthResult = await updateCharacterStatusRequest({
      charID: equipCharStatus.char_id,
      statName: 'current_cyberware_health_boxes',
      newRank: equipCharStatus.current_cyberware_health_boxes + 1,
    });
    armorResult = 'OK';
  } else if (
    (incomingCyber.name === 'Cyberarm - Right' ||
      incomingCyber.name === 'Cyberarm - Left' ||
      incomingCyber.name === 'Cyberleg - Right' ||
      incomingCyber.name === 'Cyberleg - Left') &&
    equip === false
  ) {
    healthResult = await updateCharacterStatusRequest({
      charID: equipCharStatus.char_id,
      statName: 'current_cyberware_health_boxes',
      newRank: equipCharStatus.current_cyberware_health_boxes - 1,
    });
    armorResult = 'OK';
  } else if (incomingCyber.name === 'Linear Frame Alpha' && equip === true) {
    armorResult = await updateCharacterStatusRequest({
      charID: equipCharStatus.char_id,
      statName: 'current_cyberware_armor_quality',
      newRank: equipCharStatus.current_cyberware_armor_quality + 5,
    });
    healthResult = await updateCharacterStatusRequest({
      charID: equipCharStatus.char_id,
      statName: 'current_cyberware_health_boxes',
      newRank: equipCharStatus.current_cyberware_health_boxes + 4,
    });
  } else if (incomingCyber.name === 'Linear Frame Alpha' && equip === false) {
    armorResult = await updateCharacterStatusRequest({
      charID: equipCharStatus.char_id,
      statName: 'current_cyberware_armor_quality',
      newRank: equipCharStatus.current_cyberware_armor_quality - 5,
    });
    healthResult = await updateCharacterStatusRequest({
      charID: equipCharStatus.char_id,
      statName: 'current_cyberware_health_boxes',
      newRank: equipCharStatus.current_cyberware_health_boxes - 4,
    });
  } else if (incomingCyber.name === 'Linear Frame Beta' && equip === true) {
    armorResult = await updateCharacterStatusRequest({
      charID: equipCharStatus.char_id,
      statName: 'current_cyberware_armor_quality',
      newRank: equipCharStatus.current_cyberware_armor_quality + 6,
    });
    healthResult = await updateCharacterStatusRequest({
      charID: equipCharStatus.char_id,
      statName: 'current_cyberware_health_boxes',
      newRank: equipCharStatus.current_cyberware_health_boxes + 4,
    });
  } else if (incomingCyber.name === 'Linear Frame Beta' && equip === false) {
    armorResult = await updateCharacterStatusRequest({
      charID: equipCharStatus.char_id,
      statName: 'current_cyberware_armor_quality',
      newRank: equipCharStatus.current_cyberware_armor_quality - 6,
    });
    healthResult = await updateCharacterStatusRequest({
      charID: equipCharStatus.char_id,
      statName: 'current_cyberware_health_boxes',
      newRank: equipCharStatus.current_cyberware_health_boxes - 4,
    });
  } else {
    armorResult = 'OK';
    healthResult = 'OK';
  }
  if (armorResult === 'OK' && healthResult === 'OK') {
    return 'OK';
  }
}

async function unequipCyberwareHandler(
  incomingCyber,
  equipCharDetails,
  equipCharStatus,
  cyberwareStatus,
  charGear,
  setEquipCharDetails,
  setEquipCharStatus,
  setCharGear,
  setPageAlert
) {
  switch (incomingCyber.type) {
    case 'fashionware':
      if (cyberwareStatus.fashionware_slots <= 7) {
        const equipResult = await unequipCyberware(incomingCyber);
        const slotResult = await cyberSlotChange(cyberwareStatus, 'fashionware_slots', 1);
        const statResult = await cyberStatChange(incomingCyber, equipCharDetails, false);

        if (slotResult === 'OK' && equipResult === 'OK' && statResult === 'OK') {
          fetchCharData(equipCharDetails.id, charGear, setCharGear, setEquipCharDetails, setEquipCharStatus);
        }
      } else {
        setPageAlert({ open: true, message: `You shouldn't be this fashionable- CONTACT YOUR GM AT ONCE!`, severity: 'error' });
      }
      break;
    case 'neuralware':
      if (incomingCyber.name === 'Basic Neural Link') {
        const equipResult = await unequipCyberware(incomingCyber);
        const humanityResult = await cyberHumanityChange(incomingCyber, equipCharDetails, false);
        const slotResult = await cyberSlotChange(cyberwareStatus, 'neuralware_slots', -5);

        if (equipResult === 'OK' && humanityResult === 'OK' && slotResult === 'OK') {
          fetchCharData(equipCharDetails.id, charGear, setCharGear, setEquipCharDetails, setEquipCharStatus);
        }
        break;
      } else {
        const equipResult = await unequipCyberware(incomingCyber);
        const slotResult = await cyberSlotChange(cyberwareStatus, 'neuralware_slots', 1);
        const statResult = await cyberStatChange(incomingCyber, equipCharDetails, false);
        if (equipResult === 'OK' && slotResult === 'OK' && statResult === 'OK') {
          fetchCharData(equipCharDetails.id, charGear, setCharGear, setEquipCharDetails, setEquipCharStatus);
        }
        break;
      }
    case 'cyberoptics':
      if (incomingCyber.name === 'Basic Cybereyes') {
        const equipResult = await unequipCyberware(incomingCyber);
        const humanityResult = await cyberHumanityChange(incomingCyber, equipCharDetails, false);
        const slotResult = await cyberSlotChange(cyberwareStatus, 'cyberoptic_slots', -3);
        if (equipResult === 'OK' && humanityResult === 'OK' && slotResult === 'OK') {
          fetchCharData(equipCharDetails.id, charGear, setCharGear, setEquipCharDetails, setEquipCharStatus);
        }
        break;
      } else {
        const equipResult = await unequipCyberware(incomingCyber);
        const slotResult = await cyberSlotChange(cyberwareStatus, 'cyberoptic_slots', 1);
        if (equipResult === 'OK' && slotResult === 'OK') {
          fetchCharData(equipCharDetails.id, charGear, setCharGear, setEquipCharDetails, setEquipCharStatus);
        }
        break;
      }
    case 'cyberaudio':
      if (incomingCyber.name === 'Basic Cyberaudio Suite') {
        const equipResult = await unequipCyberware(incomingCyber);
        const humanityResult = await cyberHumanityChange(incomingCyber, equipCharDetails, false);
        const slotResult = await cyberSlotChange(cyberwareStatus, 'cyberaudio_slots', -3);
        if (equipResult === 'OK' && humanityResult === 'OK' && slotResult === 'OK') {
          fetchCharData(equipCharDetails.id, charGear, setCharGear, setEquipCharDetails, setEquipCharStatus);
        }
        break;
      } else {
        const equipResult = await unequipCyberware(incomingCyber);
        const slotResult = await cyberSlotChange(cyberwareStatus, 'cyberaudio_slots', 1);
        if (equipResult === 'OK' && slotResult === 'OK') {
          fetchCharData(equipCharDetails.id, charGear, setCharGear, setEquipCharDetails, setEquipCharStatus);
        }
        break;
      }
    case 'internalware':
      if (cyberwareStatus.internalware_slots <= 7) {
        const equipResult = await unequipCyberware(incomingCyber);
        const humanityResult = await cyberHumanityChange(incomingCyber, equipCharDetails, false);
        const slotResult = await cyberSlotChange(cyberwareStatus, 'internalware_slots', 1);
        const statResult = await cyberStatChange(incomingCyber, equipCharDetails, false);
        const armorResult = await cyberArmorChange(incomingCyber, equipCharStatus, false);
        if (equipResult === 'OK' && humanityResult === 'OK' && slotResult === 'OK' && statResult === 'OK' && armorResult === 'OK') {
          fetchCharData(equipCharDetails.id, charGear, setCharGear, setEquipCharDetails, setEquipCharStatus);
        }
        break;
      } else {
        setPageAlert({ open: true, message: 'Something is wrong!', severity: 'warning' });
        break;
      }
    case 'externalware':
      if (cyberwareStatus.externalware_slots <= 1) {
        const equipResult = await unequipCyberware(incomingCyber);
        const humanityResult = await cyberHumanityChange(incomingCyber, equipCharDetails, false);
        const slotResult = await cyberSlotChange(cyberwareStatus, 'externalware_slots', 1);
        const statResult = await cyberStatChange(incomingCyber, equipCharDetails, false);
        const armorResult = await cyberArmorChange(incomingCyber, equipCharStatus, false);
        if (equipResult === 'OK' && humanityResult === 'OK' && slotResult === 'OK' && statResult === 'OK' && armorResult === 'OK') {
          fetchCharData(equipCharDetails.id, charGear, setCharGear, setEquipCharDetails, setEquipCharStatus);
        }
        break;
      } else {
        setPageAlert({ open: true, message: 'Something is wrong!', severity: 'warning' });
        break;
      }
    case 'cyberarm':
      // TODO: Handle negative slot counts.
      if (incomingCyber.name === 'Cyberarm - Right' || incomingCyber.name === 'Cyberarm - Left') {
        // changes equip
        const equipResult = await unequipCyberware(incomingCyber);
        const humanityResult = await cyberHumanityChange(incomingCyber, equipCharDetails, false);
        const slotResult = await cyberSlotChange(cyberwareStatus, 'cyberarm_slots', -3);
        const armorResult = await cyberArmorChange(incomingCyber, equipCharStatus, false);
        if (equipResult === 'OK' && humanityResult === 'OK' && slotResult === 'OK' && armorResult === 'OK') {
          fetchCharData(equipCharDetails.id, charGear, setCharGear, setEquipCharDetails, setEquipCharStatus);
        }
        break;
      } else if (
        incomingCyber.name === 'Big Knucks' ||
        incomingCyber.name === 'Scratchers' ||
        incomingCyber.name === 'Rippers' ||
        incomingCyber.name === 'Wolvers'
      ) {
        const equipResult = await unequipCyberware(incomingCyber);
        const humanityResult = await cyberHumanityChange(incomingCyber, equipCharDetails, false);
        if (equipResult === 'OK' && humanityResult === 'OK') {
          fetchCharData(equipCharDetails.id, charGear, setCharGear, setEquipCharDetails, setEquipCharStatus);
        }
        break;
      } else {
        const equipResult = await unequipCyberware(incomingCyber);
        const slotResult = await cyberSlotChange(cyberwareStatus, 'cyberarm_slots', 1);
        if (equipResult === 'OK' && slotResult === 'OK') {
          fetchCharData(equipCharDetails.id, charGear, setCharGear, setEquipCharDetails, setEquipCharStatus);
        }
        break;
      }
    case 'cyberleg':
      if (incomingCyber.name === 'Cyberleg - Right' || incomingCyber.name === 'Cyberleg - Left') {
        const equipResult = await unequipCyberware(incomingCyber);
        const humanityResult = await cyberHumanityChange(incomingCyber, equipCharDetails, false);
        const slotResult = await cyberSlotChange(cyberwareStatus, 'cyberleg_slots', -3);
        const armorResult = await cyberArmorChange(incomingCyber, equipCharStatus, false);
        if (equipResult === 'OK' && humanityResult === 'OK' && slotResult === 'OK' && armorResult === 'OK') {
          fetchCharData(equipCharDetails.id, charGear, setCharGear, setEquipCharDetails, setEquipCharStatus);
        }
        break;
      } else {
        const equipResult = await unequipCyberware(incomingCyber);
        const slotResult = await cyberSlotChange(cyberwareStatus, 'cyberleg_slots', 1);
        if (equipResult === 'OK' && slotResult === 'OK') {
          fetchCharData(equipCharDetails.id, charGear, setCharGear, setEquipCharDetails, setEquipCharStatus);
        }
        break;
      }
    case 'borgware':
      if (incomingCyber.name === 'Artificial Shoulder Mount') {
        const equipResult = await unequipCyberware(incomingCyber);
        const humanityResult = await cyberHumanityChange(incomingCyber, equipCharDetails, false);
        if (equipResult === 'OK' && humanityResult === 'OK') {
          fetchCharData(equipCharDetails.id, charGear, setCharGear, setEquipCharDetails, setEquipCharStatus);
        }
        break;
      } else if (incomingCyber.name === 'Multi-Optic Mount') {
        const equipResult = await unequipCyberware(incomingCyber);
        const humanityResult = await cyberHumanityChange(incomingCyber, equipCharDetails, false);
        const slotResult = await cyberSlotChange(cyberwareStatus, 'cyberoptic_slots', -5);
        if (equipResult === 'OK' && humanityResult === 'OK' && slotResult === 'OK') {
          fetchCharData(equipCharDetails.id, charGear, setCharGear, setEquipCharDetails, setEquipCharStatus);
        }
        break;
      } else if (incomingCyber.name === 'Sensor Array') {
        const equipResult = await unequipCyberware(incomingCyber);
        const humanityResult = await cyberHumanityChange(incomingCyber, equipCharDetails, false);
        const slotResult = await cyberSlotChange(cyberwareStatus, 'cyberaudio_slots', -5);
        if (equipResult === 'OK' && humanityResult === 'OK' && slotResult === 'OK') {
          fetchCharData(equipCharDetails.id, charGear, setCharGear, setEquipCharDetails, setEquipCharStatus);
        }
        break;
      } else if (incomingCyber.name === 'Linear Frame Alpha' || incomingCyber.name === 'Linear Frame Beta') {
        const equipResult = await unequipCyberware(incomingCyber);
        const humanityResult = await cyberHumanityChange(incomingCyber, equipCharDetails, false);
        const armorResult = await cyberArmorChange(incomingCyber, equipCharStatus, false);
        const statResult = await cyberStatChange(incomingCyber, equipCharDetails, false);

        if (equipResult === 'OK' && humanityResult === 'OK' && armorResult === 'OK' && statResult === 'OK') {
          fetchCharData(equipCharDetails.id, charGear, setCharGear, setEquipCharDetails, setEquipCharStatus);
        }
        break;
      } else {
        setPageAlert({ open: true, message: `ERROR BORGWARE NOT SUPPORTED - CONTACT YOUR GM AT ONCE!`, severity: 'error' });
        break;
      }
    default:
      break;
  }
}

export { equipCyberwareHandler, unequipCyberwareHandler };
