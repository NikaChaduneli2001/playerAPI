/**
 * @Author Nika Chaduneli
 * @version 1.0.0
 * @description made my join for get all players
 *
 */

import getErrorMessage from "../../utils/error_response_function.utils";
import getSuccessMessage from "../../utils/success_response_function.utils";
export default async function Join(Player, PlayerSkill, res) {
  try {
    let playersArray = [];

    const player = await Player.findAll();
    if (!player) {
      res.status(400).json(getErrorMessage("Could not find  players "));
    }

    const skills = await PlayerSkill.findAll();
    if (!skills) {
      res.status(400).json(getErrorMessage("Could not find  playerSkills"));
    }

    if (player !== [] && skills !== []) {
      for (let i = 0; i < player.length; i++) {
        for (let j = 0; j < skills.length; j++) {
          if (player[i].dataValues.id !== skills[j].dataValues.playerId) {
          } else {
            playersArray.push({
              id: player[i].dataValues.id,
              name: player[i].dataValues.name,
              position: player[i].dataValues.position,
              PlayerSkills: {
                id: skills[j].dataValues.id,
                skill: skills[j].dataValues.skill,
                value: skills[j].dataValues.value,
                playerId: skills[j].dataValues.playerId,
              },
            });
          }
        }
      }
      if (playersArray.length > 0) {
        res.status(200).json(getSuccessMessage(playersArray));
      }
    }

  } catch (e) {
    res
      .status(400)
      .json(getErrorMessage(`try catch Error message ${e.messageF}`));
  }
}
