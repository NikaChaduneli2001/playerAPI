/***
 * @author Nika Chaduneli
 * @Params request, response,
 * @description check players position 
 * @version 1.0.0
 * @returns "success"
 */
export default function checkPostion(request, response) {
  response.setHeader("Content-Type", "application/json");
  let positionArray = ["defender", "midfielder", "forward"];
  for (let i = 0; i < positionArray.length; i++) {
    if (positionArray[i] == request.body.position) {
      return "success";
    }
  }
}
