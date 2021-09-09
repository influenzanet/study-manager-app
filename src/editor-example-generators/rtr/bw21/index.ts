import { generate_EG0829POST } from "./surveys/eg_0829_post";
import { generate_EG0829PRE } from "./surveys/eg_0829_pre";
import { generate_EG0912PRE } from "./surveys/eg_0912_pre";
import { generate_EG0912POST } from "./surveys/eg_0912_post";
import { generate_EG0919PRE } from "./surveys/eg_0919_pre";
import { generate_EG0919POST } from "./surveys/eg_0919_post";
import { generate_PUB0912PRE } from "./surveys/pub_0912_pre";
import { generate_PUB0912POST } from "./surveys/pub_0912_post";
import { generate_PUB0829PRE } from "./surveys/pub_0829_pre";
import { generate_PUB0829POST } from "./surveys/pub_0829_post";
import { generate_PUB0919PRE } from "./surveys/pub_0919_pre";
import { generate_PUB0919POST } from "./surveys/pub_0919_post";
import { generate_KG0829PRE } from "./surveys/kg_0829_pre";
import { generate_KG0829POST } from "./surveys/kg_0829_post";
import { generate_KG0912PRE } from "./surveys/kg_0912_pre";
import { generate_KG0912POST } from "./surveys/kg_0912_post";
import { generate_KG0919PRE } from "./surveys/kg_0919_pre";
import { generate_KG0919POST } from "./surveys/kg_0919_post";
import { generate_ALL0926PRE } from "./surveys/all_0926_pre";



export const RTRSurveys = {
    EG_0829_PRE: generate_EG0829PRE,
    EG_0829_POST: generate_EG0829POST,
    EG_0912_PRE: generate_EG0912PRE,
    EG_0912_POST: generate_EG0912POST,
    EG_0919_PRE: generate_EG0919PRE,
    EG_0919_POST: generate_EG0919POST,
    KG_0829_PRE: generate_KG0829PRE,
    KG_0829_POST: generate_KG0829POST,
    KG_0912_PRE: generate_KG0912PRE,
    KG_0912_POST: generate_KG0912POST,
    KG_0919_PRE: generate_KG0919PRE,
    KG_0919_POST: generate_KG0919POST,
    PUB_0829_PRE: generate_PUB0829PRE,
    PUB_0829_POST: generate_PUB0829POST,
    PUB_0912_PRE: generate_PUB0912PRE,
    PUB_0912_POST: generate_PUB0912POST,
    PUB_0919_PRE: generate_PUB0919PRE,
    PUB_0919_POST: generate_PUB0919POST,
    ALL_0926_PRE: generate_ALL0926PRE,
}
