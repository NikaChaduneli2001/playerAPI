export default (app) => {
    app.put(`/playerSkills/:id`, require("./update").default);
    app.delete(`/playerSkills/:id`, require("./delete").default);
    app.get(`/playerSkills`, require("./getList").default);
    app.post(`/playerSkills`, require("./create").default);
  };