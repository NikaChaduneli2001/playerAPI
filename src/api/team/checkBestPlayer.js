/**
 * @author Nika Chaduneli
 * @version 1.0.0
 * @description choose best player in the world
 * @return best player
 */
import Player from "../../db/model/player";
import PlayerSkill from "../../db/model/playerSkill";
export default async function checkBestPlayers(req, res) {
  const check = await Player.findAll({
    include: {
      model: PlayerSkill,
      order: [["value", "DESC"]],
    },

    limit: 3,
  });

  if (check) {
    return res.status(200).send(check)
  }
}
