import { describe, it, expect } from "vitest";
import { AccessTokenService } from "../services/accesstoken.service";
import { RerfreshTokenService } from "../services/refreshtoken.service";
import { EXPIRED_MOCK_TOKEN } from "../constants/index.constants";

describe("AccessTokenService", () => {
  it("should throw if token is not a valid Access Token format", () => {
    expect(() => AccessTokenService.checkOwnerCredentials("dsdasd")).toThrow;
  });
});

describe("RefreshTokenService", () => {
  it("should throw if is not valid Access Token or UserColab ID", () => {
    expect(() =>
      RerfreshTokenService.createRefreshToken({
        refreshToken: "",
        userColabId: "sdsadasdasd",
      })
    ).toThrow;
  });

  it("sould throw if the token can't be decoded & verified the date", () => {
    expect(() => RerfreshTokenService.blackListVerify("dsadasdas")).toThrow;
  });

  it("sould throw if the token is expired (mocking formated token)", () => {
    expect(() => RerfreshTokenService.blackListVerify(EXPIRED_MOCK_TOKEN))
      .toThrow;
  });

  it("sould throw if the token can't be decoded & verified the owner", () => {
    expect(() => RerfreshTokenService.verifyOwner("fsdfsdfsd")).toThrow;
  });

  it("sould throw if the token can't be decoded", () => {
    expect(() => RerfreshTokenService.signAccessToken("fsdfsdfsd")).toThrow;
  });

  it("sould throw if the token can't be decoded to destroy", () => {
    expect(() => RerfreshTokenService.destroyReused("fsdfsdfsd")).toThrow;
  });
});
