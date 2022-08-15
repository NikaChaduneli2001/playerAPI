/**
 * @author Nika Chaduneli
 * @description get all skills
 * @version 1.0.0
 * @return all skills
 */
import PlayerSkill from "../../db/model/playerSkill";
import getErrorMessage from "../../utils/error_response_function.utils";
import getSuccessMessage from "../../utils/success_response_function.utils";
export default async (req, res) => {
  try {
    const findallSkills = await PlayerSkill.findAll();
    if (findallSkills) {
      res.status(200).json(getSuccessMessage(findallSkills));
    }
  } catch (e) {
    res
      .status(400)
      .json(getErrorMessage(`try catch error in getSkills message is ${e.message}`));
  }

  res.status(500);
};
