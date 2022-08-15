/***
 * @author Nika Chaduneli
 * @Params request, response,
 * @description check players skills 
 * @version 1.0.0
 * @returns "success"
 */

export default function checkSkills(request, response) {
  response.setHeader("Content-Type", "application/json");
  let skillsArray = ["defense", "attack", "speed", "strength", "stamina"];
  for (let i = 0; i < skillsArray.length; i++) {
    if (skillsArray[i] == request.body.skill) {
      return "success";
    }
  }
}
