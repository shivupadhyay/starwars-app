

// Generating a Token with expiry of 2min with encoding and decoding token.
export const generateToken = () => {
  return btoa(
    JSON.stringify({
      exp: Date.now() + 2 * 60 * 1000,
    }),
  );
};

// Moking the JWT as mentioned in requirement
const Loginauth = (username, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === "shiv" && password === "1234") {
        resolve(generateToken());
      } else {
        reject("Invalid credentials");
      }
    }, 800);
  });
};

export default Loginauth;
