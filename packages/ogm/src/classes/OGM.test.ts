/*
 * Copyright (c) "Neo4j"
 * Neo4j Sweden AB [http://neo4j.com]
 *
 * This file is part of Neo4j.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { printSchema } from "graphql";
import OGM from "./OGM";

describe("OGM", () => {
    test("should construct", () => {
        // @ts-ignore
        expect(new OGM({ typeDefs: "type User {id: ID}" })).toBeInstanceOf(OGM);
    });

    describe("methods", () => {
        describe("constructor", () => {
            test("should evoke the filterDocument method", () => {
                const ogm = new OGM({ typeDefs: `type User @auth {id:ID}` });

                const printed = printSchema(ogm.neoSchema.schema);

                expect(printed.includes("@auth")).toBeFalsy();
            });
        });

        describe("checkNeo4jCompat", () => {
            test("should neo4j-driver Driver missing", async () => {
                // @ts-ignore
                const ogm = new OGM({ typeDefs: "type User {id: ID}" });

                await expect(ogm.checkNeo4jCompat()).rejects.toThrow(`neo4j-driver Driver missing`);
            });
        });

        describe("model", () => {
            test("should throw cannot find model", () => {
                const ogm = new OGM({ typeDefs: `type User {id:ID}` });

                const model = "not-real";

                expect(() => ogm.model(model)).toThrow(`Could not find model ${model}`);
            });
        });
    });
});
