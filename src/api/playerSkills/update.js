/***
 * @author Nika Chaduneli
 * @Params request, response,
 * @description update skills
 * @version 1.0.0
 * @returns updated skills
 */

import PlayerSkill from "../../db/model/playerSkill";
import getSuccessMessage from "../../utils/success_response_function.utils";
import getErrorMessage from "../../utils/error_response_function.utils";
export default async (req, res) => {
  try {
    const findPlayerSkillById = await PlayerSkill.findOne({
      where: { id: req.params.id },
    });
    if (findPlayerSkillById) {
      (findPlayerSkillById.skill = req.body.skill),
        (findPlayerSkillById.value = req.body.value),
        (findPlayerSkillById.playerId = req.body.playerId);
      res.status(200).json(getSuccessMessage(findPlayerSkillById));
      await findPlayerSkillById.save();
    } else {
      return res
        .status(400)
        .json(getErrorMessage("could not update user with given parms"));
    }
  } catch (e) {
    res
      .status(400)
      .json(getErrorMessage(`try catch error in update skill message is ${e.message}`));
  }

  res.status(500);
};
