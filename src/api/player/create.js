// ---------------------------------------------------------------------------------------------
// YOU CAN FREELY MODIFY THE CODE BELOW IN ORDER TO COMPLETE THE TASK
// ---------------------------------------------------------------------------------------------

/***
 * @author Nika Chaduneli
 * @Params request, response,
 * @description create players
 * @version 1.0.0
 * @returns created players or error messages
 */

import Player from "../../db/model/player";
import getSuccessMessage from "../../utils/success_response_function.utils";
import getErrorMessage from "../../utils/error_response_function.utils";
import checkPostion from "./checkPosition";
export default async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    //  Validate request
    if (!req.body.name && !req.body.position) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    }

    // check position
    if (checkPostion(req, res) !== "success") {
      return res
        .status(400)
        .send(
          getErrorMessage(`Invalid value for position: ${req.body.position}`)
        );
    }

    // Create a Player
    const player = {
      name: req.body.name,
      position: req.body.position,
    };

    const createPlayer = await Player.create(player);
    if (createPlayer) {
      let obj = {
        id: createPlayer.id,
        name: createPlayer.name,
        position: createPlayer.position,
      };
      res.status(200).json(getSuccessMessage(obj));
      await createPlayer.save();
      res.end();
    } else {
      res.status(400).send(getErrorMessage("Error while creating player"));
      res.end();
    }
  } catch (e) {
    res
      .status(400)
      .send(
        getErrorMessage(`try catch error message in create player ${e.message}`)
      );
  }

  res.status(500);
};
