export default async () => {
  try {
    const req = await import("./index.js")
    await req.default()
    return 0;
  } catch(err) {
    console.error(err);
    return 1;
  }
};
