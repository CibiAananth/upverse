import { isPlainObject, isString, template } from "lodash-es";
import getError from "./get-error.js";
import { isGitRepo } from "./git.js";

import { ERRORS } from "../helpers/errors.js";

export default async (context) => {
  await verifyGit(context);
};

async function verifyGit(context) {
  const {
    cwd,
    env,
    options: { repositoryUrl, tagFormat, branches },
  } = context;

  if (!(await isGitRepo({ cwd, env }))) {
    throw getError(ERRORS.GIT.NOT_A_REPO, context);
  }

  if (!repositoryUrl) {
    throw getError(ERRORS.GIT.NO_REPO_URL, context);
  }
}
