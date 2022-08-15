// /////////////////////////////////////////////////////////////////////////////
// PLEASE DO NOT MODIFY, RENAME OR REMOVE ANY OF THE CODE BELOW.
// ALSO DO NOT CHANGE THE EXPORTED VALUE OF THIS FILE
// YOU CAN ADD YOUR CODE TO THIS FILE AND USE THEM IN YOUR WORK.
// /////////////////////////////////////////////////////////////////////////////

/**
 * @author Nika Chaduneli
 * @version 1.0.0
 * @description choose best team in the world
 * @return team
 */

import Player from "../../db/model/player";
import PlayerSkill from "../../db/model/playerSkill";
import { Op } from "sequelize";
import getSuccessMessage from "../../utils/success_response_function.utils";
import checkBestPlayers from "./checkBestPlayer";
import getErrorMessage from "../../utils/error_response_function.utils";
export default async (req, res) => {
  Player.hasMany(PlayerSkill);
  PlayerSkill.belongsTo(Player);

  if (
    !req.body.position &&
    !req.body.mainSkill &&
    !req.body.numberOfPlayers &&
    !req.body.value
  ) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // check position count
  const positionCount = await Player.count({
    where: { position: req.body.position },
  });

  if (positionCount < req.body.numberOfPlayers) {
    return res
      .status(400)
      .send(
        getErrorMessage(
          `Insufficient number of players for position: ${req.body.position}`
        )
      );
  }

  if (req.body) {
    const team = await Player.findAll({
      include: {
        model: PlayerSkill,
        where: {
          skill: { [Op.like]: `%${req.body.mainSkill}%` },
          value: { [Op.like]: `%${req.body.value}%` },
        },
      },
      where: {
        position: {
          [Op.like]: `%${req.body.position}%`,
        },
      },

      limit: req.body.numberOfPlayers,
    });
    if (team.length === 0) {
      checkBestPlayers(req, res);
    } else {
      res.status(200).send(getSuccessMessage(team));
    }
  }

  res.status(500);
};
