import envCi from "env-ci";

import getLogger from "../utils/getLogger.js";
import getConfig from "../utils/getConfig.js";
import verify from "../utils/verify.js";

async function run(context) {
  // Verify config
  await verify(context);
}

export default async (
  cliOptions = {},
  { cwd = process.cwd(), env = process.env, stdout, stderr } = {}
) => {
  const context = {
    cwd,
    env,
    stdout: stdout || process.stdout,
    stderr: stderr || process.stderr,
    envCi: envCi({ env, cwd }),
  };
  context.logger = getLogger(context);
  const { options } = await getConfig(context, cliOptions);
  context.options = options;

  await run(context);
};
