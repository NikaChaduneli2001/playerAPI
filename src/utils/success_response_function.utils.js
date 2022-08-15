import responseType from "./response_type.enum";
function getSuccessMessage(data) {
  return {
    status: responseType.status,
    data: data,
  };
}

export default getSuccessMessage;
