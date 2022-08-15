import responseType from "./response_type.enum";
function getErrorMessage(message) {
  return { status: responseType.error, message:message };
}

export default getErrorMessage;
