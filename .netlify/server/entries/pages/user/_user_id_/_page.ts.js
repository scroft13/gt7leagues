import { e as error } from "../../../../chunks/index3.js";
function load({ params }) {
  if (params.user_id) {
    return {
      title: "Hello world!",
      content: "Welcome to our blog. Lorem ipsum dolor sit amet..."
    };
  }
  error(404, "Not found");
}
export {
  load
};
