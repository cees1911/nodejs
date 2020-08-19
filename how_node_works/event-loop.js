const fs = require("fs");
const crypto = require("crypto");
const { nextTick } = require("process");

const start = Date.now();

process.env.UV_THREADPOOL_SIZE = 3;

setTimeout(() => console.log("Timer 1 klaar"), 0);
setImmediate(() => console.log("immdiate 1 klaar"));

fs.readFile("test-file.txt", () => {
  console.log("I/O klaar");
  console.log("----------------------------------");

  setTimeout(() => console.log("Timer 2 klaar"), 0);
  setTimeout(() => console.log("Timer 3 klaar"), 3000);
  setImmediate(() => console.log("immdiate 2 klaar"));

  process.nextTick(() => console.log("process nextTick"));

  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "Password encrypted sync");

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () =>
    console.log(Date.now() - start, "Password encrypted")
  );

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () =>
    console.log(Date.now() - start, "Password encrypted")
  );

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () =>
    console.log(Date.now() - start, "Password encrypted")
  );

  crypto.pbkdf2("password", "salt", 100000, 1024, "sha512", () =>
    console.log(Date.now() - start, "Password encrypted")
  );

  /*crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(Date.now() - start, "Password encrypted sync");*/
});

console.log("hoi dit is top-level code");
