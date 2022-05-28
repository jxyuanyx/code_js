'use strict';

import {ToOldLanguage} from "../../mtt/script/common/Translator";

if (!window.i18n) {
    window.i18n = {};
}

if (!window.i18n.languages) {
    window.i18n.languages = {};
}


window.i18n.languages['tc'] = ToOldLanguage('tc');