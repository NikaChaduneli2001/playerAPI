/***
 * @author Nika Chaduneli
 * @Params request, response,
 * @description create players skills
 * @version 1.0.0
 * @returns created skills
 */
import PlayerSkill from "../../db/model/playerSkill";
import getSuccessMessage from "../../utils/success_response_function.utils";
import getErrorMessage from "../../utils/error_response_function.utils";
import checkSkills from "./checkSkills";
export default async (req, res) => {
  try {
    res.setHeader("Content-Type", "application/json");
    //  Validate request
    if (!req.body.skill && !req.body.value && !req.body.playerId) {
      res.status(400).send({
        message: "Content can not be empty!",
      });
      return;
    }

    // check skills
    if (checkSkills(req, res) !== "success") {
      return res
        .status(400)
        .send(getErrorMessage(`Invalid value for skills: ${req.body.skill}`));
    }

    // Create a PlayerSkills
    const skillsObject = {
      skill: req.body.skill,
      value: req.body.value,
      playerId: req.body.playerId,
    };

    const createPlayerSkill = await PlayerSkill.create(skillsObject);
    if (createPlayerSkill) {
      let obj = {
        id: createPlayerSkill.id,
        skill: createPlayerSkill.skill,
        value: createPlayerSkill.value,
        playerId: createPlayerSkill.playerId,
      };
      res.status(200).json(getSuccessMessage(obj));
      await createPlayerSkill.save();
      res.end();
    } else {
      res.send(getErrorMessage("Error while creating playerSkills"));
      res.end();
    }
  } catch (e) {
    res
      .status(400)
      .json(
        getErrorMessage(
          `try catch error message in create skills is ${e.message} `
        )
      );
  }

  res.status(500);
};
