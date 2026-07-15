import { LanguageHelpers } from "../external/common-study-definition/build/studies/common/languages/languageHelpers";

const CONSENT_TEXT_EN_BE = `**Help us track the health effects of heat waves — confirm your participation**

Dear Infectieradar participant,

Because you are already part of the Infectieradar community, we would like to invite you to take part in a new study on the health effects of heat waves, running from mid-July to mid-September 2026.

To join, we ask you to complete one short one-off questionnaire now, about your housing and how heat affects you. During the study, you will then receive a short (~30 second) survey once a week, asking whether you experienced any heat-related symptoms (such as extreme thirst, dizziness, fainting, difficulty sleeping due to heat, confusion, muscle cramps, lack of coordination, or a racing heartbeat) and how you managed them.

Participation is entirely voluntary. You can withdraw at any time, without giving a reason, by compiling again this short questionnaire and selecting “No / I want to withdraw”; this will not affect your involvement in Infectieradar. Your data is protected under GDPR: only pseudonymized data is used for research purposes, and your responses remain confidential and securely held by the University of Hasselt. You can find full details, including your data protection rights, in the study's [Participant Information Sheet](https://drive.google.com/file/d/1JKXg3TnsqVCWoCnNvLxDGK6ndGAq19fA/view?usp=drive_link). **You may also reference the copy sent to your email.**

Interim results will be shared in October 2026 and final results in December 2026, published as anonymous, aggregate statistics on [Infectieradar](https://www.infectieradar.be).

Thank you for helping us better understand how heat affects health in the community.`;

LanguageHelpers.addLanguage(
    "en",
    {
        "heatwave.consent.Q1.text": {
            en: CONSENT_TEXT_EN_BE,
        },
    },
    "heatwave/en-be-overrides",
);
