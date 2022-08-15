// ---------------------------------------------------------------------------------------------
// YOU CAN FREELY MODIFY THE CODE BELOW IN ORDER TO COMPLETE THE TASK
// ---------------------------------------------------------------------------------------------
/***
 * @author Nika Chaduneli
 * @Params request, response,
 * @description update players, first find it , then update
 * @version 1.0.0
 * @returns updated players
 */
import Player from "../../db/model/player";
import getSuccessMessage from "../../utils/success_response_function.utils";
import getErrorMessage from "../../utils/error_response_function.utils";
export default async (req, res) => {
  try {
    const findPlayerById = await Player.findOne({
      where: { id: req.params.id },
    });
    if (findPlayerById) {
      (findPlayerById.name = req.body.name),
        (findPlayerById.position = req.body.position),
        (findPlayerById.PlayerSkills = req.body.PlayerSkills);
      res.status(200).json(getSuccessMessage(findPlayerById));
      await findPlayerById.save();
    } else {
      return res
        .status(400)
        .json(getErrorMessage("could not update user with given parms"));
    }
  } catch (e) {
    res
      .status(400)
      .json(
        getErrorMessage(
          `try catch error message in update playeris ${e.message}`
        )
      );
  }

  res.status(500);
};
