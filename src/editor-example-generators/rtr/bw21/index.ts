import { generate_EG0829POST } from "./surveys/eg_0829_post";
import { generate_EG0829PRE } from "./surveys/eg_0829_pre";
import { generate_EG0912PRE } from "./surveys/eg_0912_pre";
import { generate_EG0912POST } from "./surveys/eg_0912_post";


export const RTRSurveys = {
    EG_0829_PRE: generate_EG0829PRE,
    EG_0829_POST: generate_EG0829POST,
    EG_0912_PRE: generate_EG0912PRE,
    EG_0912_POST: generate_EG0912POST
}
