import { definitions } from "../helpers/errors.js";

class UpVerseError extends Error {
  constructor(message, code, details) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = "UpVerseError";
    this.code = code;
    this.details = details;
    this.upVerse = true;
  }
};


export default (code, ctx = {}) => {
  const { message, details } = definitions[code](ctx);
  return new UpVerseError(message, code, details);
};
