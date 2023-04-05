import signale from "signale";
import figures from "figures";

const { Signale } = signale;

export default ({
  stdout = process.stdout,
  stderr = process.stderr,
  scope = "upverse",
}) => {
  const options = {
    config: {
      displayTimestamp: true,
      underlineMessage: false,
    },
    disabled: false,
    interactive: false,
    scope,
    stream: [stdout],
    types: {
      error: {
        badge: figures.cross,
        stream: [stderr],
      },
      success: {
        badge: figures.tick,
        stream: [stdout],
      },
      info: {
        badge: figures.info,
        stream: [stdout],
      },
    },
  };
  return new Signale(options);
};
