// ---------------------------------------------------------------------------------------------
// YOU CAN FREELY MODIFY THE CODE BELOW IN ORDER TO COMPLETE THE TASK
// ---------------------------------------------------------------------------------------------
/***
 * @author Nika Chaduneli
 * @Params request, response,
 * @description get all players (I made my Join function)
 * @version 1.0.0
 * @returns all players
 */
import Player from "../../db/model/player";
import PlayerSkill from "../../db/model/playerSkill";
import getSuccessMessage from "../../utils/success_response_function.utils";
const { Op } = require("sequelize");
import Join from "./join";
export default async (req, res) => {
  // my join function
  // Join(Player, PlayerSkill, res);

  Player.hasMany(PlayerSkill);
  PlayerSkill.belongsTo(Player);
  if (req.query.name) {
    const player = await Player.findAll({
      include: { model: PlayerSkill},
      where: {
        name: {
          [Op.like]: `%${req.query.name}%`,
        },
      },
    });
    if (player) {
      return res.status(200).send(getSuccessMessage(player));
    }
  }

  const playersObject = await Player.findAll({
    include: PlayerSkill,
  });
  if (playersObject) {
    res.status(200).send(getSuccessMessage(playersObject));
  }

  res.status(500);
};
