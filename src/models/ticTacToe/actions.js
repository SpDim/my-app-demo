// const PLAY = 'PLAY';
// export const play = (payload) => ({ type: PLAY, payload });
// play.type = PLAY;

// const JUMP_TO = 'JUMP_TO';
// export const jumpTo = (payload) => ({ type: JUMP_TO, payload });
// jumpTo.type = JUMP_TO;

import { Action } from "../../libraries/models/Action";

export const play = Action('PLAY');
export const jumpTo = Action('JUMP_TO');