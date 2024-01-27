import { e as error } from "../../../../chunks/index3.js";
function load({ params }) {
  if (params.league_name) {
    return {
      leagueName: params.league_name
    };
  }
  error(404, "Not found");
}
export {
  load
};
