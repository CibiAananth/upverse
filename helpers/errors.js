export const ERRORS = {
  GIT: {
    NOT_A_REPO: "ERROR_GIT_NOT_A_REPO",
    NO_REPO_URL: "ERROR_GIT_NO_REPO_URL",
  },
};

export const definitions = {
  [ERRORS.GIT.NOT_A_REPO]({ cwd }) {
    return {
      message: "Not running from a git repository.",
      details: `The \`upverse\` command must be executed from a Git repository.
      The current working directory is \`${cwd}\`.
      Please verify your CI configuration to make sure the \`upverse\` command is
      executed from the root of the cloned repository.`,
    };
  },
  [ERRORS.GIT.NO_REPO_URL]() {
    return {
      message: "The `repositoryUrl` option is required.",
      details: `The repositoryUrl option cannot be determined from the upverse configuration, the \`package.json\` nor the [git origin url](https://git-scm.com/book/en/v2/Git-Basics-Working-with-Remotes). Please make sure to add the \`repositoryUrl\` to the upverse configuration.`,
    };
  },
};
