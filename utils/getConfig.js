import { castArray, isNil, pickBy, isEmpty } from "lodash-es";
import { cosmiconfig } from "cosmiconfig";

import { getRepoUrl } from "./git.js";

import getLogger from "./getLogger.js";

const debug = getLogger({ scope: "upverse:config" }).info;

const CONFIG_NAME = "upverse";

export default async (context, cliOptions) => {
  const { cwd } = context;
  const { config, filepath } =
    (await cosmiconfig(CONFIG_NAME).search(cwd)) || {};
  debug("load config from: %s", filepath);

  // Merge config file options and CLI/API options
  let options = { ...config, ...cliOptions };
  // Set default options values if not defined yet
  options = {
    branches: [
      "main",
      "master",
      "next",
      "next-major",
      { name: "beta", prerelease: true },
      { name: "alpha", prerelease: true },
    ],
    tagFormat: `v\${version}`,
    repositoryUrl: await getRepoUrl({ cwd }),
    // Remove `null` and `undefined` options, so they can be replaced with default ones
    ...pickBy(options, (option) => !isNil(option)),
    ...(options.branches ? { branches: castArray(options.branches) } : {}),
  };
  if (options.ci === false) {
    options.noCi = true;
  }

  debug("options values: %O", options);
  return { options };
};
