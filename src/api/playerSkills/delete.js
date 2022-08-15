/**
 * @author Nika Chaduneli
 * @description delete skills
 * @version 1.0.0
 * @return deleted skills
 */
import playerSkills from ".";
import getErrorMessage from "../../utils/error_response_function.utils";
import getSuccessMessage from "../../utils/success_response_function.utils";
export default async (req, res) => {
  try {
    const deleteSkills = await playerSkills.findOne({
      where: { id: req.params.id },
    });
    if (!deleteSkills) {
      res
        .status(400)
        .json(getErrorMessage("Could not find  skills with given Id"));
    }

    await deleteSkills.destroy();

    res.status(200).json(getSuccessMessage(deleteSkills));
  } catch (e) {
    res
      .status(400)
      .json(
        getErrorMessage(`try catch error in detele skills message ${e.message}`)
      );
  }

  res.status(500);
};
