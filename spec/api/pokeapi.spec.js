const axios = require("axios");

const BASE_URL = "https://pokeapi.co/api/v2";

describe("PokeAPI", () => {
  describe("GET /pokemon", () => {
    it("returns a paginated list of pokemon", async () => {
      const response = await axios.get(`${BASE_URL}/pokemon`);

      expect(response.status).toBe(200);
      expect(typeof response.data.count).toBe("number");
      expect(Array.isArray(response.data.results)).toBe(true);
      expect(response.data.results.length).toBeGreaterThan(0);

      const entry = response.data.results[0];
      expect(typeof entry.name).toBe("string");
      expect(typeof entry.url).toBe("string");
    });
  });

  describe("GET /pokemon/pikachu", () => {
    it("returns details for pikachu", async () => {
      const response = await axios.get(`${BASE_URL}/pokemon/pikachu`);

      expect(response.status).toBe(200);
      expect(response.data.name).toBe("pikachu");
      expect(response.data.id).toBe(25);
      expect(Array.isArray(response.data.types)).toBe(true);
      expect(response.data.types.some((t) => t.type.name === "electric")).toBe(true);
    });
  });

  describe("GET /pokemon-species/pikachu", () => {
    it("returns species details for pikachu", async () => {
      const response = await axios.get(`${BASE_URL}/pokemon-species/pikachu`);

      expect(response.status).toBe(200);
      expect(response.data.name).toBe("pikachu");
      expect(response.data.generation.name).toBe("generation-i");
    });
  });

  describe("GET /pokemon/does-not-exist", () => {
    it("returns a 404 for an unknown pokemon", async () => {
      await expectAsync(
        axios.get(`${BASE_URL}/pokemon/does-not-exist`)
      ).toBeRejectedWithError(/404/);
    });
  });
});
