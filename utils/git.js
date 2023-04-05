import { execa } from "execa";

import getLogger from "./getLogger.js";
const debug = getLogger({ scope: "upverse:git" }).error;

/**
 * Test if the current working directory is a Git repository.
 *
 * @param {Object} [execaOpts] Options to pass to `execa`.
 *
 * @return {Boolean} `true` if the current working directory is in a git repository, falsy otherwise.
 */
export async function isGitRepo(execaOptions) {
  try {
    return (
      (await execa("git", ["rev-parse", "--is-inside-work-tree"], execaOptions))
        .exitCode === 0
    );
  } catch (error) {
    debug(error);
  }
}

/**
 * Get the repository remote URL.
 *
 * @param {Object} [execaOpts] Options to pass to `execa`.
 *
 * @return {string} The value of the remote git URL.
 */
export async function getRepoUrl(execaOptions) {
  try {
    return (
      await execa("git", ["config", "--get", "remote.origin.url"], execaOptions)
    ).stdout;
  } catch (error) {
    debug(error);
  }
}

/**
 * Verify the write access authorization to remote repository with push dry-run.
 *
 * @param {String} repositoryUrl The remote repository URL.
 * @param {String} branch The repository branch for which to verify write access.
 * @param {Object} [execaOpts] Options to pass to `execa`.
 *
 */
export async function hasWriteAccess(repositoryUrl, branch, execaOptions) {
  try {
    await execa(
      "git",
      ["push", "--dry-run", "--no-verify", repositoryUrl, `HEAD:${branch}`],
      execaOptions
    );
  } catch (error) {
    debug(error);
  }
}
