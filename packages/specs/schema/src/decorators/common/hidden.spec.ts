import {getJsonSchema} from "../../utils/getJsonSchema";
import {Hidden} from "./hidden";
import {Get, getSpec, Path, SpecTypes} from "@tsed/schema";

describe("@Hidden", () => {
  it("should generate the right json schema", () => {
    // WHEN
    class Model {
      @Hidden()
      prop: number;
    }

    expect(getJsonSchema(Model)).toEqual({
      type: "object"
    });
  });

  it("should generate the right json schema", () => {
    // WHEN
    @Path("/")
    class Model {
      @Hidden()
      @Get("/hidden")
      hidden() {}

      @Get("/hidden")
      method() {}
    }

    expect(getSpec(Model, {specType: SpecTypes.OPENAPI})).toEqual({
      paths: {
        "/hidden": {
          get: {
            operationId: "modelMethod",
            parameters: [],
            responses: {
              "200": {
                description: "Success"
              }
            },
            tags: ["Model"]
          }
        }
      },
      tags: [
        {
          name: "Model"
        }
      ]
    });
  });
});
