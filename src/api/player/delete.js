// ---------------------------------------------------------------------------------------------
// YOU CAN FREELY MODIFY THE CODE BELOW IN ORDER TO COMPLETE THE TASK
// ---------------------------------------------------------------------------------------------

import Player from "../../db/model/player";
import getErrorMessage from "../../utils/error_response_function.utils";
import getSuccessMessage from "../../utils/success_response_function.utils";
export default async (req, res) => {
  try {
    const deletePlayer = await Player.findOne({ where: { id: req.params.id } });
    if (!deletePlayer) {
      res
        .status(400)
        .json(getErrorMessage("Could not find  player with given Id"));
    }

    await deletePlayer.destroy();

    res.status(200).json(getSuccessMessage(deletePlayer));
  } catch (e) {
    res
      .status(400)
      .json(
        getErrorMessage(`try catch error message in delete player ${e.message}`)
      );
  }

  res.status(500);
};
