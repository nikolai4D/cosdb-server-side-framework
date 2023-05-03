const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const app = express();
const { graphqlHTTP } = require("express-graphql");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const { loadFilesSync } = require("@graphql-tools/load-files");
const sequelize = require("../db/db.js");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
require("dotenv").config();

app.use(
  "/",
  express.static(
    path.join(
      __dirname,
      "/../../../node_modules/cosdb-client-framework/app-boilerplate"
    )
  )
);

app.use(
  "/core",
  express.static(
    path.join(__dirname, "/../../../node_modules/cosdb-client-framework/core")
  )
);

app.use(
  "/components",
  express.static(
    path.join(
      __dirname,
      "/../../../node_modules/cosdb-client-framework/components"
    )
  )
);

app.use(
  "/data-mgmt",
  express.static(
    path.join(
      __dirname,
      "/../../../node_modules/cosdb-client-framework/data-mgmt"
    )
  )
);

// Api
app.use("/api", require("../api/routes.js"));

// Import the models and register them with Sequelize
const models = {};
const modelFiles = loadFilesSync(path.join(__dirname, "./models/*.js"));
modelFiles.forEach((file) => {
  const model = require(file)(sequelize, Sequelize.DataTypes);
  models[model.name] = model;
});

// Load the GraphQL type definitions and resolvers
const typesArray = loadFilesSync(
  path.resolve(__dirname, "../db/schemas/**/*.graphql")
);

const resolversArray = loadFilesSync(
  path.resolve(__dirname, "../db/resolvers/**/*.js")
);

// Merge the type definitions and resolvers into a single executable schema
const typeDefs = mergeTypeDefs(typesArray);
const resolvers = mergeResolvers(resolversArray);
console.log("Type Definitions:", typeDefs);
console.log("Resolvers:", resolvers);

const schema = makeExecutableSchema({ typeDefs, resolvers });

// Attach the models to the GraphQL context
app.use(
  "/graphql",
  graphqlHTTP(async (req, res) => {
    const context = { models, sequelize };
    return {
      schema,
      context,
      graphiql: true,
    };
  })
);

app.get("*", function (req, res, next) {
  res.sendFile(
    path.join(
      __dirname,
      "/../../../node_modules/cosdb-client-framework/app-boilerplate/index.html"
    )
  );
});

// app.listen(3005, () => {
//   console.log("server is listening on port 3005");
// });

// Sync the database and start the server
sequelize
  .sync()
  .then(() => {
    app.listen(3005, () => {
      console.log("server is listening on port 3005");
    });
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = app;
